import { userModel } from "./user.model.js";
import { productModel } from "./product.model.js";
import { commentModel } from "./comment.model.js";
import { cartItemModel } from "./cartItem.model.js";
import { cartModel } from "./cart.model.js";


userModel.hasMany(commentModel, {
  onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

commentModel.belongsTo(userModel);



cartModel.hasMany(cartItemModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

cartItemModel.belongsTo(cartModel)

productModel.hasOne(cartItemModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


cartItemModel.belongsTo(productModel)

userModel.hasOne(cartModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
cartModel.belongsTo(userModel)

productModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(productModel)

export {
    userModel,
    productModel,
    cartItemModel,
    cartModel,
    commentModel
}