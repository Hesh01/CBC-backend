import Product from '../../model/productModel.js';

export async function getProduct(req,res){
     
    try {
    const productlist = await Product.find()
            res.json({
                list: productlist
            })
        }catch(e) {
            res.json({
                message: "Error"
            })
        }
    }
