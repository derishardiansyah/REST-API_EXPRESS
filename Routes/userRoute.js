import express from "express";
import userController from "../Controllers/userController.js";
import verifyToken from "../Controllers/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/registration", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/profile", verifyToken, userController.profile);

export default userRouter;
