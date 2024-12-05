import { UserModel } from "../models/userModel.js";

export const adminMiddleware = async(req, res, next) => { 
    try {
        const user = await UserModel.findById(req.body.id);
        if (user.role !== "admin") {
            return res.status(403).send({
                success: false,
                message: "Admin Access Only",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Unauthorized Access",
            error,
        });
    }
};