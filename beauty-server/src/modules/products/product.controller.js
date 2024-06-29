import { productModel } from "../../../database/models/product.model.js";
import { commentModel } from "../../../database/models/comment.model.js";
import { userModel } from "../../../database/models/user.model.js";

export const addProduct = async (req, res) => {
    try {
        const { title, desc, price } = req.body;
        const image_path = "http://localhost:4000/" + req.file.path;
        const addProduct = await productModel.create({title,description:desc , price , image_path})
        res.status(201).json({message:'success' , product:addProduct})
    } catch (error) {
        res.status(400).json({message:'faild' , error})
    }
}


export const getAllProduct = async (req ,res) => {
    try {
        const products = await productModel.findAll();
        res.status(200).json({message:'success' , data :products})
    } catch (error) {
        res.status(400).json({message:'faild', error })
    }
}

export const getSpacificProduct = async (req, res) => {
    try {
        const productId = req.params.id

        const product = await productModel.findByPk(productId, {attributes:['id','title','description','price','image_path'],include: [{ model: commentModel,attributes:['id','content'],include:[{model:userModel,attributes:['name']}]}]});
        res.status(200).json({message:'success' , data:product})
    } catch (error) {
        res.status(400).json({message:'faild' , error})
    }
}