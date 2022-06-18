import { Users } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const checkLoggedIn = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if(!refreshToken) return res.redirect("/");
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.redirect("/");
        const jwtVerify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        res.getUserData = jwtVerify;
        next();
    } catch (error) {
        return error;
    }
};


const pathRedirect = "/dashboard";
export const homePage = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if(!refreshToken) return next();
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return next();
        return res.redirect(pathRedirect)
    } catch (error) {
        return error;
    }
};