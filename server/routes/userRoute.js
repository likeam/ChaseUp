import express from "express";
import { registerUserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUserController);

export default router;
