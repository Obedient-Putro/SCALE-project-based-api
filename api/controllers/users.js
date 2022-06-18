import { Users } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'username', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

export const Register = async (req, res) => {
    const { registerUsername, registerEmail, registerPassword, registerConfirmPassword } = req.body;
    const Email = validator.isEmail(registerEmail);
    if(!Email) return res.status(400).json({ msg: 'Email is not an "email"' });
    
    const user = await Users.findAll({
        where: {
            email: registerEmail
        }
    });
    if(user[0]) return res.status(400).json({ msg: "Email is been used" });

    const passLength = validator.isLength(registerPassword, {min: 6});
    if(!passLength) return res.status(400).json({ msg: "Password must be more than 6 character" });

    if(registerPassword !== registerConfirmPassword) return res.status(400).json({ msg: "Password and Confirm Password Doesn't Match"});
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerPassword, salt);
    try {
        await Users.create({
            username: registerUsername,
            email: registerEmail,
            password: hashedPassword
        });
        res.json({ msg: "Register Succesfull" });
    } catch (error) {
        console.log(error);
    }
};

export const Login = async (req, res) => {
    const Email = validator.isEmail(req.body.loginEmail);
    if(!Email) return res.status(400).json({ msg: 'Email is not an "email"' });
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.loginEmail
            }
        });
        const match = await bcrypt.compare(req.body.loginPassword, user[0].password);
        if(!match) return res.status(400).json({ msg: "Wrong password or username" });
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, username, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ msg: "Wrong password or username" });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null}, {
        where: {
            id:userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
};