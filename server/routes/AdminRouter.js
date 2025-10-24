import express from "express";
import { AddSpam, delUser, findAllUsers } from "../controller/AdminController.js";
const adminRouter=express.Router();
adminRouter.get("/dashboard",findAllUsers);
adminRouter.delete("/deluser",delUser);
adminRouter.post("/spam",AddSpam);
export default adminRouter;