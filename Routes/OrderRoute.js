import express from "express";
import { createOrder } from "../Controllers/order/CreateOrder";
import { getOrders } from "../Controllers/order/getOrders";


const orderRouter = express.Router();

orderRouter.post("/newOrder", createOrder)


export default orderRouter;