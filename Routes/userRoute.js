import express from "express";
import userController from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/registration", userController.addUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
