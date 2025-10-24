
import { SpamUser } from "../models/SpamUser.js";
import { PropertyData, User } from "../models/UserModel.js";
export const findAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({users});
    }catch(error){
        res.status(400).json({message:error});
    }
}
export const delUser=async(req,res)=>{
    try{
        const email=req.query.email;
        const users=await User.findOneAndDelete({email});
        await PropertyData.deleteMany({email});
        res.status(200).json({message:`email deleted`,user:users});
    }
    catch(error){
        const email=req.query.email;
        res.status(400).json({message:`error in deleting ${email}`});
    }
}
export const AddSpam=async(req,res)=>{
    try{
        const email=req.query.email;
        const spammer=new SpamUser({email:email});
        await spammer.save();
        res.status(200).json({message:'user banned'});
    }catch(error){
        res.status(400).json({message:error});
    }
}