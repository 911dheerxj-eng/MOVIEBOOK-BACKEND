import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./auth.model.js"

// Random token banane aur uska SHA-256 hash banane ke liye
import crypto from "crypto";

// Gmail se reset email bhejne ke liye
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
  // User ko email se dhundo
  const user = await User.findOne({ email });

  // Email database mein nahi hai toh bhi generic response dena
  if (!user) {
    return {
      message: "If this email is registered, a reset link has been sent.",
    };
  }

  // Ek random 32-byte token banao
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Original token ka SHA-256 hash banao
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Current time se 15 minutes aage ka expiry time banao
  const expiryTime = Date.now() + 15 * 60 * 1000;

  // Database mein sirf hashed token aur expiry save karo
  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: expiryTime,
  });

  // Gmail ke through email bhejne ka setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Frontend ka reset password URL banao
  const frontendURL = (process.env.FRONTEND_URL || "https://mbf-gamma.vercel.app").replace(/\/$/, "");
  const resetLink = `${frontendURL}/reset-password?token=${resetToken}`;

  try {
    // User ko reset link email karo
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
    // Email fail ho toh purana reset token hata do
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    // Error controller tak bhejo
    throw error;
  }

  // Success response return karo
  return {
    message: "If this email is registered, a reset link has been sent.",
  };
};




export const resetPasswordService = async (token, newPassword) => {
  // Email wale original token ka SHA-256 hash banao
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Database mein valid aur unexpired token wala user dhundo
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  // Token galat hai ya expire ho chuka hai
  if (!user) {
    return null;
  }

  // New password ko bcrypt se sirf EK baar hash karo
  const encryptedPassword = await bcrypt.hash(newPassword, 10);

  // Password update karo aur reset token delete karo
  await User.findByIdAndUpdate(user._id, {
    password: encryptedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });

  // Password successfully update ho gaya
  return {
    message: "Password reset successfully",
  };
};
