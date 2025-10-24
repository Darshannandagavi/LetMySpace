import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import path, { resolve } from "path";
import fs from "fs";
import userRouter from "./routes/UserRoute.js";
import categoryRouter from "./routes/CategoryRouter.js";
import subCategoryRouter from "./routes/SubCategoryRouter.js";
import contactRouter from "./routes/ContactRouter.js";
import adminRouter from "./routes/AdminRouter.js";

//connecting to mongoDB
const app = express(); //initializes an Express server.
app.use(bodyParser.json()); //parses data to json data to send data to backend
app.use(cors()); //allows web applications running on different origins (domains) to communicate with each other
dotenv.config(); // loads environment variables from a .env file into process.env, allowing secure configuration management.
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
mongoose
  .connect(URL) //mongodb connection
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      //start server only if database is connected
      console.log(`Server is runniing on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

//File upload code
//path.resolve():gives absolute path of current working directory
//path.join(): joins uploads with absolute path. syn:absolutepath/uploads ex:req on user/login after path.join user/login/uploads
const uploadDirectory = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }); //Configures Multer for handling file uploads
app.use("/uploads", express.static(uploadDirectory)); //Serves uploaded files as static assets.Allows users to access files via URL

//Handling File Upload Requests
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const filePath = path.join("uploads", req.file.filename);
  res.status(200).json({ message: "File uploaded successfully", filePath });
});

//Handling File Downloads
app.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(uploadDirectory, fileName);
  res.download(filePath, (err) => {
    if (err) {
      console.error("file download error:", err);
      res.status(404).send("file not found");
    }
  });
});

const propImgDirectory = path.join(path.resolve(), "propertyImages");
if (!fs.existsSync(propImgDirectory)) {
  fs.mkdirSync(propImgDirectory, { recursive: true });
}
const propertyImageStorage = multer.diskStorage({
  destination: (req, propImg, cb) => {
    cb(null, propImgDirectory);
  },
  filename: (req, propImg, cb) => {
    cb(null, Date.now() + "-" + propImg.originalname);
  },
});
app.use("/propertyImages", express.static("propertyImages"));

const propImg = multer({ storage: propertyImageStorage });

app.post("/propertyImages", propImg.single("propImg1"), (req, res) => {
  let filepath = "";
  try {
    if (!req.file) {
      res.status(400).json({ message: "add valid image" });
    }
  
    filepath = path.join("propertyImages", req.file.filename);
    res.status(200).json({ "filepath": filepath });
    } catch (error) {
      res.status(500).json({message:"internal server error"})
  }
});
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/contact", contactRouter);
app.use("/admin", adminRouter);

app.use((req,res)=>{
  console.log("route not found");
  res.status(404).json({message:'404 page not found...'});
});