import express from "express";
import userController from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/registration", userController.addUser);

export default userRouter;
