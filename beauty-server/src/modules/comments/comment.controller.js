import { commentModel } from "../../../database/models/comment.model.js";
import jwt from 'jsonwebtoken'


export const addComment = async (req, res) => {
    try {
        const { token } = req.headers;
        const { content, productId } = req.body;
        const descoded = jwt.decode(token);
        const newComment = await commentModel.create({ content, productId, userId: descoded.id })
        res.status(201).json({message:'success' , data:newComment})
    } catch (error) {
        res.status(400).json({message:'faild' , error})
    }
}


