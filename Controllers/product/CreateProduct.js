import Product from '../../model/productModel.js';
import { isAdmin } from '../user/permission.js';

export async function createProduct(req, res) {
    
    if(!isAdmin(req)){
        res.json({
          message: "Please login as administrator to add products"
        })
        return
      }
    
      const newProduct = req.body

    try {
        const product = new Product(newProduct);
        await product.save();
            res.json({
                message: "Product created Successfully"
            });
    } catch (e) {
        res.json({
            message: "Product not created",
          
        });
    }
}