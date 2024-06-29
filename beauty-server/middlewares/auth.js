import { userModel } from "../database/models/user.model.js";
import validator from "validator";
import jwt from 'jsonwebtoken'
export const checkSignup = async (req, res, next) => {
    try {
        const { name, email, password, phone_number } = req.body;
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(phone_number) ) {
            res.status(400).json({message:'faild' , error :"All Data is Reqwuired" })
        } else {
            if (validator.isEmail(email)) {
                const isFound = await userModel.findOne({ where: { email: email } })
                if (isFound) {
                    res.status(400).json({message:'faild' , error:'Email is Already Exist'})
                } else {
                    next()
                }
            } else {
                res.status(400).json({message:'faild' , error:'Email is Not Vaild'})
            }
        }
    } catch (error) {
        res.status(400).json({message:'faild' , error : 'InValid Data '})
    }
}


export const checkLogin = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if (validator.isEmpty(email) || validator.isEmpty(password)) {
            res.status(400).json({message:'faild' , error:'All Data Is Required'})
        } else {
            if (validator.isEmail(email)) {
                const isFound = await userModel.findOne({ where: { email: email } })
                if (isFound) {
                    next()
                } else {
                    res.status(400).json({mesage:'faild' , error:'Email is Not Found Please Register First'})
                }
            } else {
                res.status(400).json({message:"faild" , error:"Email Is Not Vaild"})
            }
        }
    } catch (error) {
        res.status(400).json({ message: "faild", error: "InValid Data" });
    }
}


export const auth = (req, res, next) => {
    try {
        const { token } = req.headers;
        const verfify = jwt.verify(token, process.env.privateKey);
        if (verfify) {
            next()
        } else {
            res.status(401).json({message:'faild' , error:'unAuthorized'})
        }
    } catch (error) {
        res.status(401).json({ message: "faild", error: "Unauthorized" });
    }
}