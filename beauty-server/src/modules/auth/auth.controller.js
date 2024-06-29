import {userModel} from './../../../database/models/index.db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password , 5);
        const addedUser = await userModel.create({ name, email, phone_number, password:hashedPassword });
        res.status(201).json({message:"success" , data:addedUser})
    } catch (error) {
        res.status(400).json({message:'faild' , error:error})
    }
}


export const login = async(req,res)=> {
    try {
        const { email, password } = req.body;
        const foundedUser = await userModel.findOne({ where: { email: email } });
        if (foundedUser) {
            const verfifyPassword =  bcrypt.compareSync(password, foundedUser.password)
            if (verfifyPassword) {
                const token = jwt.sign({ id: foundedUser.id, name: foundedUser.name, email: foundedUser.email, phone_number: foundedUser.phone_number }, process.env.privateKey)
                res.status(200).json({message:'success' , token})
            } else {
                res.status(400).json({message:'faild' , error:'Invaild Password'})
            }
        } else {
            res.status(400).json({message:'faild' , error:'Email Is Not Exist'})
        }
        
    } catch (error) {
        res.status(400).json({message:'faild' , error:'Bad Schema'})
    }
}