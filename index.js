import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './Routes/productRoute.js';
import userRouter from './Routes/UserRouter.js';
import jwt from "jsonwebtoken";

const app = express()


const mongourl = "mongodb+srv://cbcdb:123@cluster0.z6mru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database conected")
})

app.use(
    (req,res,next)=>{

    const token =  req.header("Authorization")?.replace("Bearer ","");
        console.log(token)

     if(token != null){
         jwt.verify(token,"cbc-key-9751", (error,decoded)=>{

             if(!error){
                console.log(decoded)
                req.user = decoded;
            }
        })
     }
     next()
    }
)


app.use(bodyParser.json())

app.use ("/api/users", userRouter)

app.use("/api/product",productRouter)







app.listen(
    5000,
    ()=>{
        console.log("Server is running on port 5000");
    }
)