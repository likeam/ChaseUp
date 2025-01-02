import express from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerUserController,
  updateUserController,
  uploadAvatar,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.get("/logout", auth, logoutController);
router.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
router.put("/update-user", auth, updateUserController);
router.put("/forgot-password", forgotPasswordController);
router.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);

export default router;
