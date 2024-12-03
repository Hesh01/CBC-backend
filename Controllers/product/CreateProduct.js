import Product from '../../model/productModel.js';

export async function createProduct(req, res) {
     console.log(req.user);

    // Check if the user is logged in
    if (!req.user) {
        res.json({
            message: "You are not logged in"
        });
        return;
    }

    // Check if the user is an admin
    if (req.user.type !== "admin") {
        res.json({
            message: "You are not an admin"
        });
        return;
    }

    try {
        const product = new Product(req.body);
        await product.save();
            res.json({
                message: "Product created"
            });
    } catch (e) {
        res.json({
            message: "Product not created",
          
        });
    }
}