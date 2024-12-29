import sendEmail from "../config/sendEmail.js";
import User from "./../models/userModel.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplat.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name and password",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = { name, email, password: hashPassword };

    const newUser = new User(payload);

    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from ChasUp",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await User.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await User.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verify email done",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}
