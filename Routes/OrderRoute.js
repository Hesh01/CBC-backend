import express from "express";
import { createOrder } from "../Controllers/order/CreateOrder.js";
import { getOrders } from "../Controllers/order/getOrders.js";


const orderRouter = express.Router();

orderRouter.post("/newOrder", createOrder)
orderRouter.get("/OrdersList", getOrders)


export default orderRouter;