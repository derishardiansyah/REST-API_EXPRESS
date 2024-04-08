import express from "express";
import userController from "../Controllers/userController.js";
import verifyToken from "../Controllers/verifyToken.js";
import upload from "../Helper/photoHelper.js";

const userRouter = express.Router();

userRouter.post("/registration", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/profile", verifyToken, userController.profile);
userRouter.put("/profile/update", verifyToken, userController.updateProfile);
userRouter.put(
  "/profile/image",
  verifyToken,
  upload.single("profile_image"),
  userController.profileImage
);
userRouter.get("/banner", userController.getBanner);
userRouter.get("/service", verifyToken, userController.getService);
userRouter.get("/balance", verifyToken, userController.getBalance);
userRouter.post("/topup", verifyToken, userController.topUp);
userRouter.post("/transaction", verifyToken, userController.transaction);
userRouter.get(
  "/transaction/history",
  verifyToken,
  userController.getTransactionHistory
);

export default userRouter;
