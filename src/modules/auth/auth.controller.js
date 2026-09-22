import { registerService } from "./auth.service.js";
import { loginService } from "./auth.service.js";



export const registerController = async (req, res) => {
    const user = await registerService(req.body)
    if (!user) {
        return res.json({
            status: "ok",
            message: "User already exists"
        })
    }
    res.json({
        status: "ok",
        user: user
    })
}




export const loginController = async (req, res) => {
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
};