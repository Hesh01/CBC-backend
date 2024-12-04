import Order from "../../model/OrdersModel.js";
import { isCustomer } from "../user/permission.js";


export async function createOrder(req, res) {
  if (!isCustomer) {
    return res.json({
      message: "Please login as customer to create orders",
    });
  }

  try {
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

    let orderID;

    if (latestOrder.length === 0 || !latestOrder[0]?.orderID) {
      // No orders found or orderID is missing
      orderID = "CBC0001";
    } else {
      const currentOrderId = latestOrder[0].orderID;

      const numberString = currentOrderId.replace("CBC", "");

      const number = parseInt(numberString, 10);

      const newNumber = (number + 1).toString().padStart(4, "0");

      orderID = "CBC" + newNumber;
    }

    const newOrderData = req.body;
    newOrderData.orderID = orderID;
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);

    await order.save();

    res.json({
      message: "Order created Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

