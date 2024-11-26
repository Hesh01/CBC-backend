import express from "express";
import { createProduct, getProduct, getProductByName } from "../Controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/", getProduct)

productRouter.post("/", createProduct)

productRouter.get("/:name" ,getProductByName)

export default productRouter;
