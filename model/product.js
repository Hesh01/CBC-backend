import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{ type:String, require:true},
    description:{type:String,require:true },
    price:{type:Number, require:true},
    image:{type:String,require:true},
    category:{type:Array},
    wholesaleprice:{type:Number},
    wholesaleminmumQuntity:{type:Number},
    concern:{type:Array},
    inStock: {type:Boolean, default:true }
})

const Product = mongoose.model("Product",
    productSchema)

export default Product;