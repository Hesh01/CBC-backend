import express from "express";
import { createProduct } from "../Controllers/product/CreateProduct.js";
import { getProduct } from "../Controllers/product/getProduct.js";
import { getProductByName } from "../Controllers/product/getProductByName.js";


const productRouter = express.Router();

productRouter.post("/", createProduct)

productRouter.get("/", getProduct)

productRouter.get("/:name" ,getProductByName)

export default productRouter;
