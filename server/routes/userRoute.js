import express from "express";
import {
  loginController,
  logoutController,
  registerUserController,
  uploadAvatar,
  verifyEmailController,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.get("/logout", auth, logoutController);
router.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

export default router;
