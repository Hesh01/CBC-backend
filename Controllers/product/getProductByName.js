import Product from '../../model/productModel.js';

export async function getProductByName(req, res) {
    const name = req.params.name;

    try {
        const productlist = await Product.find({ name: name });

        if (productlist.length == 0) {
            res.json({
                message: "Product not found",
            });
        }else{
            res.json({
                list: productlist
        });
        }
    } catch (e) {
        res.json({
            message: "Error",
        });
    }
}
