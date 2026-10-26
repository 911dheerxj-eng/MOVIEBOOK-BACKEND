import jwt from "jsonwebtoken"
export const validateUser = (req, res, next) => {

    if (!req.headers["authorization"]) {
        return res.status(401).json({
            status: "ERROR",
            message: "Token not found"
        })
    }
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);

    try {
        const result = jwt.verify(token, process.env.JWT_SIGN)
        if (!result) {
            return res.status(401).json({
                status: "ERROR",
                message: "Invalid Token"
            })
        }
        req.userId = result.userId;
        next()
    }
    catch (error) {
        console.log(error);



        return res.status(401).json({
            status: "ERROR",
            message: "Invalid Token",
            extraMessage: error.message
        })
    }
}