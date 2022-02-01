import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/post.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";


const app=express();
dotenv.config();



app.use(bodyParser.json({limit:"30mb" ,extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb" ,extended:true}));
app.use(cors());

app.use('/posts',router);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.send("Hello to Memories Api");
})




const port =process.env.PORT||5000;
mongoose.connect("mongodb+srv://abc_project:abc_project786@cluster0.iagxc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(port,()=>console.log(`server connection successfully  on :${port}`)))
.catch((e)=>console.log(e));