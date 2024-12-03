import Order from "../../model/OrdersModel";
import { isCustomer } from "../user/permission.js";

export async function createOrder(req,res){

    // Check if the user is logged in
    if(!isCustomer){
        res.json({
          message: "Please login as customer to create orders"
        })
      }
    
      try{
        // Fetch the latest order to generate a new order ID
        const latestOrder = await Order.find().sort({date : -1}).limit(1)
    
        let orderId
    
        if(latestOrder.length == 0){
          orderId = "CBC0001"
        }else{
          const currentOrderId = latestOrder[0].orderId
    
          const numberString =  currentOrderId.replace("CBC","")  // remove the CBC
    
          const number = parseInt(numberString)       //convert to number
    
          const newNumber = (number + 1).toString().padStart(4, "0");
    
          orderId = "CBC" + newNumber
        }
        

         // Prepare order data

        const newOrderData = req.body
        newOrderData.orderId = orderId
        newOrderData.email = req.user.email
        
        // Create and save the new order
        const order = new Order(newOrderData)
    
        await order.save()
    
        res.json({
          message: "Order created"
        })
    
    
      }catch(error){
        res.status(500).json({
          message: error.message
        })
      }
    
    }




