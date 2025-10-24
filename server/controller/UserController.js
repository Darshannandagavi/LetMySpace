import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User, PropertyData } from "../models/UserModel.js";
import { verificationCodes } from "./CodeStore.js";
import { SpamUser } from "../models/SpamUser.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, userStatus, role ,emailVerification} = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(emailVerification===verificationCodes[email]){
      console.log("email varification complete");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      userStatus: userStatus || "Active",
      role: role || "User",
    });
    await newUser.save();
    await sendEmail(newUser, res);
    res.status(201).json({ message: "User registered successfully" });
  }else{
    res.status(420).json({message:"invalid varification code"});
  }
  } catch (error) {
    console.error("registration error:", error);
    res.status(500).json({ message: error.message });
  }
};
const sendEmail = async (user,req,res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Welcome to our Services",
      html: `<p style='font-size:22px;color:black;font-weight:500;font-style:verdana;'>Hello ${user.firstName} Welcome to Let-My-Space,</p>
<div style='display:inline-block;padding:5px;'>      
<pre style='font-size:17px;color:black;font-weight:500;font-style:Arial;'>🎉 Welcome to LetMySpace – Your Space, Your Choice!

Dear ${user.firstName},
Thank you for registering with LetMySpace! 🎊 We’re thrilled to have you on board.

👉 With LetMySpace, finding the perfect rental space is simple and hassle-free! Whether it’s a home, office, or shop, we connect you with the best options.

✨ What’s Next?
✅ Explore available listings
✅ Connect with property owners
✅ Manage your preferences effortlessly

If you have any questions, feel free to reach out to our support team. We’re here to help!


Welcome to the LetMySpace family! 🚀
<div style="height:100px;width:100px;border-radius:50%;background-size:cover;background-image:url('https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg');"></div>
Best regards,
The LetMySpace Team</pre></div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send welcome email" });
      }
      console.log("Email sent:", info.response);
    });
  } catch (error) {
    console.error("Error in email function :", error);
    throw new Error(error);
  }
};



export const emailVerification=async(req,res)=>{
    try{
        const {email}=req.body;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email]=verificationCode;
        console.log(email);
        console.log(verificationCode);
        await verifyEmail(email,verificationCode);
        res.status(200).json({verificationCode});
    }catch(error){
        res.status(400).json({message:error});
    }
}

export const verifyEmail=(email,verificationCode)=>{
     try {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Email verification code",
          html: `<p>Hello,</p>
                <p>Below is the email verification code to register.</p>
                <br><br>
                <h2>${verificationCode}</h2>
                <br><br>
                <p>Best regards,<br>Let-My-Space</p>`,
        };
        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error in sending verification email:", error);
              reject(new Error("Failed to send the email"));
            } else {
              console.log("Verification Email sent:", info.response);
              resolve(info);
            }
          });
        });
      } catch (error) {
        console.error("Error in email functions", error);
        throw new Error(error);
      }
}


export const findAllUsers = async (req, res) => {
  try {
    return res.status(200).json(await User.find());
  } catch (error) {
    console.error("Error in finding User:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const findUser = async (req, res) => {
  try {
    const { email } = req.params;
    res.status(200).json(await User.findOne({ email }));
  } catch (error) {
    console.error("Error finding User:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    await User.findByIdAndUpdate(user._id,{userStatus:"Active"});
    res.status(200).json({
      message: "login successfully",
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userStatus: user.userStatus,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during ", error);
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email,oldPassword,newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Entered old password is wrong" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error changing user password", error);
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ message: "User not found" });
    }
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();
    const hashedPassword = await bcrypt.hash(randomNumber, 10);
    user.password = hashedPassword;
    await user.save();
    console.log(randomNumber)
    await sendForgotPasswordEmail(user, randomNumber);
    return res
      .status(200)
      .json({ message: "Temporary password sent to email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const sendForgotPasswordEmail = async (user, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Temporary Password for Account Access",
      html: `<p>Hello ${user.firstName},</p>
            <p>Below is the temprary password to login.Please change it after logging in</p>
            <br><br>
            <h3>${password}</h3>
            <br><br>
            <p>Best regards,<br>Let-My-Space</p>`,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(new Error("Failed to send the email"));
        } else {
          console.log("Email sent:", info.response);
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error("Error in email functions", error);
    throw new Error(error);
  }
};

export const propertySender = async (req, res) => {
  try {
    const userInfo = new PropertyData({ ...req.body });
    await userInfo.save();
    await sendPropertyEmail(userInfo);
    return res
      .status(200)
      .json({
        message: `property data saved successfully - Registered email for this property is :${userInfo.ownerEmail}`,
      });
  } catch (error) {
    console.log("propertysender", error);
    return res.status(500).json({ message: error.message });
  }
};
const sendPropertyEmail = (propertyData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: propertyData.ownerEmail,
      subject: "property details uploaded in Let-My-Space",
      html: `<h1>Hello ${propertyData.propertyOwner}</h1>
            <br>
             <p>"Thank you for listing your property on LetMySpace! 🎉 Your submission has been successfully uploaded. We appreciate your contribution in helping people find their perfect space. Our team will review your listing, and it will be live soon. In the meantime, feel free to explore more or manage your listings from your dashboard. 🏡✨"</p>
             <br>
             <h3>this is your property data uploaded in Let-My-Space</h3>
             <br>
            <div style='display:inline-block;border-radius:20px;overflow:hidden;border:2px solid grey;'>
            <table style='border-collapse:collapse;'>
                <thead>
                <tr style='padding:10px;'>
                    <th style='border:2px solid grey;padding:20px;'>Attribute</th>
                    <th style='border:2px solid grey;padding:20px;'>Values</th>
                </tr>
                </thead>
                <tbody>
                <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Name</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${
                      propertyData.propertyOwner
                    }</td>
                </tr>
                <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Property Type</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${
                      propertyData.propertyType
                    }</td>
                </tr>
                <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Property Size</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${
                      propertyData.propertySize
                    }</td>
                </tr>
                ${
                  propertyData.propertyWorth
                    ? ` <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Built Year</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${propertyData.propertyWorth}</td>
                </tr>`
                    : ""
                }
                <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Property Location</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${
                      propertyData.propertyLocation
                    }</td>
                </tr>
                ${
                  propertyData.landType
                    ? ` <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Land Type</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${propertyData.landType}</td>
                </tr>`
                    : ""
                }
                ${
                  propertyData.builtYear
                    ? ` <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Built Year</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${propertyData.builtYear}</td>
                </tr>`
                    : ""
                }
                <tr style='padding:10px;'>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>Contact</td>
                    <td style='border:2px solid grey;text-align:center;padding:10px 20px;'>${
                      propertyData.ownerContact
                    }</td>
                </tr>
                </tbody>
            </table>
            </div>
            <br><br>
            <p>Best Regards,</p>
            <h3>Let-My-Space</h3>
            `,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending Email");
          reject(new Error("failed to send Email"));
        } else {
          console.log("Email sent:", info);
          resolve(info.response);
        }
      });
    });
  } catch (error) {
    console.error("error in sending Email:", error);
  }
};



export const getProperty = async (req, res) => {
  try {
    const properties = await PropertyData.find();
    return res.status(200).json(properties);
    
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMyProperty=async (req,res)=>{
  try{
    const ownerEmail=req.query.email;
    const myproperty=await PropertyData.find({ownerEmail});
    console.log(ownerEmail)
    console.log("properties: ",myproperty);
    res.status(200).json(myproperty);
  }catch(error){
    res.status(500).json({error:"error in fetching myProperty"});
  }
}

export const deleteMyProperty=async(req,res)=>{
    await PropertyData.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"property Deleted successfully"});
}

export const logoutUser=async(req,res)=>{
  try{
    const email=req.query.email;
    const user=await User.findOne({email});
    console.log(user);
    user.userStatus='inactive';
    user.save();
    console.log(user);
    res.status(200).json({status:user.userStatus,message:"user logged out"});
  }catch(error){
    res.status(400).json({message:'error in logout'});
  }
}

export const spamChecker=async(req,res)=>{
  try{
    const {email}=req.body;
    const spam=await SpamUser.find({email});
    res.status(200).json(spam);
  }catch(error){
    res.status(500).json({message:"error in checking spam"});
  }
}