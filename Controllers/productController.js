import Product from "../model/product.js";


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


export function createProduct (req,res){

    console.log(req.user)

     if(req.user == null){
         res.json({
              message:"You are not logged in"
         })
         return
     }
     if(req.user.type != "admin"){
         res.json({
             message:"You are not an admin"
         })
         return
     }

    const product = new Product(req.body)
        product.save().then(() => {
            res.json({
                message:"Product created"
            })
        }).catch(()=> {
            res.json({
                message:"Product not created"
            })
        })
}


export async function getProductByName(req, res) {
    const name = req.params.name;

    try {
        const productlist = await Product.find({ name: name });
        res.json({
            list: productlist
        });
    } catch (error) {
        res.json({
            message: "Error",
        });
    }
}


