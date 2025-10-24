import express from 'express';
import { changePassword, deleteMyProperty, deleteUser, emailVerification, findAllUsers, findUser, forgotPassword, getMyProperty, getProperty, loginUser, logoutUser, propertySender, registerUser, spamChecker, updateUser } from '../controller/UserController.js';
const userRouter=express.Router();
userRouter.put('/forgotPassword/:email',forgotPassword);

userRouter.get('/properties',getProperty);
userRouter.post('/propertyUploader',propertySender)
userRouter.post('/login',loginUser);
userRouter.post("/spam",spamChecker);
userRouter.post("/",registerUser);
userRouter.get("/",findAllUsers);
userRouter.post("/verifyEmail",emailVerification)
userRouter.get("/uploadedProperties",getMyProperty);
userRouter.put("/logout",logoutUser);
userRouter.delete("/uploadedProperties/:id",deleteMyProperty);
userRouter.get("/:email",findUser);
userRouter.put('/:userId',updateUser);
userRouter.delete('/:userId',deleteUser);
userRouter.post('/changePassword',changePassword);







// Add this at the end
userRouter.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
export default userRouter;
