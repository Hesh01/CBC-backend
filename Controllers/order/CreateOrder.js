import Order from "../../model/OrdersModel.js";
import Product from "../../model/productModel.js";
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

    const newProductArray =[];

    for(let i=0;i<newOrderData.orderedItems.length;i++){
      const product= await Product.findOne({
        productID : newOrderData.orderedItems[i].productID
      })

      if(product == null){
        res.json({
          message:" Product with ID "+newOrderData.orderedItems[i].productID+" not found"
        })
        return
      }

      newProductArray[i]={
        name : product.productname,
        price : product.price,
        quantity : newOrderData.orderedItems[i].quantity,
        image : product.image[0]
      }

    }
    console.log(newProductArray)

    newOrderData.orderedItems = newProductArray


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

