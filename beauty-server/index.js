import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import commentRouter from "./src/modules/comments/comment.routes.js";
import productRouter from "./src/modules/products/product.routes.js";
import userRouter from "./src/modules/auth/auth.routes.js";
import cartRouter from "./src/modules/cart/cart.routes.js";
import cors from 'cors'
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/cart", cartRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
