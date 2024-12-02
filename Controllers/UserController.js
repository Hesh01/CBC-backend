import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export function createUser (req,res){

    const newUserData = req.body;

    // hash the password
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    //create a new user instance
    const user = new User(newUserData);


    //save the user to the database
    user.save().then(() => {
        res.json({
            message:"User created"
        });
    }).catch(()=> {
        res.json({
            message:"User not created"
        })
    })
    
}


export function loginUser (req,res){

    User.find({email : req.body.email}).then((users)=>{
        if (users.length == 0){
            res.json({
                message:"User not found"
            })
        } else{

            const user = users[0]

            const isPasswordCorrect= bcrypt.compareSync(req.body.password, user.password)

            if(isPasswordCorrect){
                const token= jwt.sign({
                    email :user.email,
                    First_Name : user.First_Name,
                    Last_Name : user.Last_Name,
                    isBlocked : user.isBlocked,
                    type : user.type,
                    profile_pic : user.profile_pic           
                }, process.env.SECRET)
                
                res.json({
                    message: "user logged in",
                    token: token
                })


            }else {
                res.json({
                    message: "User not logged in"
                })
            }
        }
    })
}


export function deleteUser(req,res){
    User.deleteOne({email:req.body.email}).then(()=>{
        res.json({
            message:"User Deleted"
        })
    })

}