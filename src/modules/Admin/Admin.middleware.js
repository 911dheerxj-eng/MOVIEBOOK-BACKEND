import { User } from "../auth/auth.model.js";


export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        status: "ERROR",
        message: "User not found"
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        status: "ERROR",
        message: "Admin access required"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
};