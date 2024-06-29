import { cartModel } from './../../../database/models/cart.model.js';
import jwt from 'jsonwebtoken'
import {cartItemModel} from './../../../database/models/cartItem.model.js'
import {productModel} from './../../../database/models/product.model.js'

const calcTotalPrice = (cartItems) => {
    const data = JSON.parse(cartItems)
    try {
         let totalPrice = 0;
        data.forEach((e) => {
           totalPrice += e.quantity * e.product.price;
         });

         return totalPrice;
    } catch (error) {
        console.log(error);
    }
}



export const addToCart = async (req, res) => {
    try {
        const { token } = req.headers;
        const decode =  jwt.decode(token)
        const isFound = await cartModel.findOne({ where: { userId: decode.id } })
        if (isFound) {
            const { quantity, productId } = req.body;
            const isItemFound = await cartItemModel.findOne({ where: { cartId: isFound.id, productId: productId } })
            if (isItemFound) {
                const newQuantity = isItemFound.quantity + 1;
                await cartItemModel.update({ quantity: newQuantity },{where:{id:isItemFound.id}})
                const allCartItem = await cartItemModel.findAll({
                    where: { cartId: isFound.id },
                    attributes: ["quantity"],
                    include: {
                        model: productModel,
                        attributes: ["title", "description", "image_path", "price"],
                    },
                });
                const totalPrice = calcTotalPrice(JSON.stringify(allCartItem));
                res.status(201).json({message:'success' , data: allCartItem , totalPrice })
            } else {
                await cartItemModel.create({ quantity, productId, cartId: isFound.id })
                const allCartItem = await cartItemModel.findAll({
                    where: { cartId: isFound.id },
                    attributes: ["quantity"],
                    include: {
                        model: productModel,
                        attributes: ["title", "description", "image_path", "price"],
                    },
                });
                res.status(201).json({message:'success' , data: allCartItem})
            }
        } else {
            const { quantity, productId } = req.body;
            const newCart = await cartModel.create({ cart_status: 'open', userId: decode.id })
            await cartItemModel.create({ quantity, productId, cartId:newCart.id })
            const allCartItem = await cartItemModel.findAll({ where: { cartId: newCart.id },attributes: ["quantity"],
                include: {
                    model: productModel,
                    attributes: ["title", "description", "image_path", "price"],
                },
            })
            res.status(201).json({ message: "success", data: allCartItem });
        }
    } catch (error) {
        res.status(400).json({message:'faild' , error})
    }
}


export const updateCart = async (req, res) => {
    try {
        const { token } = req.headers;
        const { productId, quantity } = req.body;
        const userData = jwt.decode(token);
        const userCart = JSON.stringify(await cartModel.findAll({ where: { userId: userData.id } }));
        const userCartData = JSON.parse(userCart)
        const updateCart = await cartItemModel.update({ quantity }, { where: { cartId: userCartData[0].id, productId: productId } });

        res.status(200).json({message:'success',updateCart})
    } catch (error) {
        res.json({message:'faild' , error:"Server Error"})
    }
}

export const getUserCart = async (req,res) => {
    try {
        const { token } = req.headers;
        const userData = jwt.decode(token);
        const userCart = await cartModel.findOne({ where: { userId: userData.id } });
        const cartItem = await cartItemModel.findAll({where:{cartId:userCart.id},attributes:['quantity'],include:{model:productModel}})
        const totalPrice = calcTotalPrice(JSON.stringify(cartItem))
        res.status(200).json({ message: "success", data: cartItem , totalPrice });
    } catch (error) {
        res.status(400).json({message:'faild', error:error})
    }
}