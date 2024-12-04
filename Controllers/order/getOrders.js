import Order from "../../model/OrdersModel.js";

export async function getOrders(req,res){
    try{
      const orders = await Order.find({email : req.user.email})
  
      res.json(orders)
  
    }catch(error){
      res.status(500).json({
        message: error.message
      })
    }
  }