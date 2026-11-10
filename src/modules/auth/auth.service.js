import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./auth.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";




export const registerService = async (data) => {
    const user = await User.findOne({
        email: data.email
    })
    if (user) {
        return null
    }
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: encryptedPassword
    })
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SIGN)

    const userObj = newUser.toJSON();
    delete userObj.password;
    return { ...userObj, token }
}




export const loginService = async (data) => {
    if (!data.email || !data.password) {
        return null;
    }
    const user = await User.findOne({
        email: data.email,
    })
    if (!user) {
        return null;
    }
    const result = await bcrypt.compare(data.password, user.password);
    if (result == true) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SIGN)
        const userObj = user.toJSON();
        delete userObj.password;
        return { ...userObj, token };
    }
    else {
        return null;
    }
}


export const getUsersService = async () => {
    const users = await User.find().select("-password");
    return users;
};



export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      message: "If this email is registered, a reset link has been sent.",
    };
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expiryTime = Date.now() + 15 * 60 * 1000;
  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: expiryTime,
  });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS not configured in environment variables");
    throw new Error("Email service is not configured. Please contact support.");
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const frontendURL = (process.env.FRONTEND_URL || "https://mbf-gamma.vercel.app").replace(/\/$/, "");
  const resetLink = `${frontendURL}/reset-password?token=${resetToken}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "MovieBook - Reset Your Password",
      html: `
        <h2>MovieBook Password Reset</h2>
        <p>Hello ${user.name},</p>
        <p>Click the button below to reset your password.</p>

        <a href="${resetLink}"
          style="background:#9333ea;color:white;padding:12px 20px;
          text-decoration:none;border-radius:8px;display:inline-block;">
          Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      `,
    });
  } catch (error) {
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
    throw error;
  }
  return {
    message: "If this email is registered, a reset link has been sent.",
  };
};




export const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return null;
  }
  const encryptedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, {
    password: encryptedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });
  return {
    message: "Password reset successfully",
  };
};
