import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    name:{ type:String, required: true },
    userID:{ type:String , required: true},
    products: { type:Array , required: true},
    total:{ type:Number, required: true},
    address:{ trype:String},
    phone: { type:Number},
    status: {type:Number, default:0 }
})



const Order = mongoose.model("Orders", orderSchema);

export default Order;