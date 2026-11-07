import { registerService, loginService, getUsersService, forgotPasswordService, resetPasswordService } from "./auth.service.js";


export const registerController = async (req, res) => {
    try {
        const user = await registerService(req.body)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User already exists"
            })
        }
        res.json({
            status: "ok",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}




export const loginController = async (req, res) => {
    try {
        const user = await loginService(req.body);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            })
        }
        res.json({
            status: "ok",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};




export const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService();
        res.json({
            status: "ok",
            users: users
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};





// Forgot password request handle karna
export const forgotPasswordController = async (req, res) => {
  try {
    // User ka email request se lena
    const email = req.body.email?.trim().toLowerCase();

    // Email missing hai toh error dena
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Service ko email bhejna
    const result = await forgotPasswordService(email);

    // Success response bhejna
    return res.status(200).json(result);

  } catch (error) {
    // Error terminal mein show karna
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: error.message || "Unable to process request. Please try again later.",
      error: error.message
    });
  }
};





// Reset password request handle karna
export const resetPasswordController = async (req, res) => {
  try {
    // Email link se token lena
    const { token, newPassword } = req.body;

    // Token aur password check karna
    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
      });
    }

    // Password minimum 8 characters ka hona chahiye
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Password reset service call karna
    const result = await resetPasswordService(token, newPassword);

    // Token invalid ya expired hai
    if (!result) {
      return res.status(400).json({
        message: "Reset link is invalid or expired",
      });
    }

    // Success response bhejna
    return res.status(200).json(result);

  } catch (error) {
    // Error terminal mein show karna
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Unable to reset password. Please try again.",
    });
  }
};
