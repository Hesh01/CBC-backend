import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './Routes/productRoute.js';
import userRouter from './Routes/UserRouter.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express()

const mongourl = process.env.MONGO_DB_URL

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
         jwt.verify(token,process.env.SECRET, (error,decoded)=>{

             if(!error){
                console.log(decoded)
                req.user = decoded;
            }
        })
     }
     next()
    }
)

app.use(express.json())

app.use(bodyParser.json())

app.use ("/api/users", userRouter)
app.use("/api/product",productRouter)







app.listen(
    5000,
    ()=>{
        console.log("Server is running on port 5000");
    }
)