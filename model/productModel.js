import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productname:{ type:String, require:true},
    alt_names:{type:[String], default:true},
    productID :{type:String, require:true, unique: true},
    image:{type:[String] ,require:true},
    price:{type:Number, require:true},
    sellingPrice:{ type:Number, require:true},
    description:{type:String,require:true },
    category:{type:Array},
    concern:{type:Array},
    inStock: {type:Boolean, default:true }
})

const Product = mongoose.model("Product", productSchema)

export default Product;