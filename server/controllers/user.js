import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin=async (req,res)=>{
    const {email,password}=req.body;
    try{

        const ExistedUser=await User.findOne({email});
        if(!ExistedUser) return res.status(400).json({"message":'User do not have account!!'});
        const isCorrectPassword=await bcrypt.compare(password,ExistedUser.password);
        if(!isCorrectPassword) return res.status(400).json({"message":'credentials is invalid'});
        const token=jwt.sign({email:ExistedUser.email,id:ExistedUser._id},'test',{expiresIn:'1h'});
        res.status(200).json({ result : ExistedUser,token});

    }catch(e){
        res.status(500).json({"message":'Something went wrong'});
        console.log(e);

    }

}


export const signup=async (req,res)=>{

    const {email,password,confirmPassword,firstName,lastName}=req.body;
    try{
        const ExistedUser=await User.findOne({email});
        if(ExistedUser) return res.status(400).json({message:'User already have an account'});
        if(password===!confirmPassword) return res.status(400).json({"message" : 'Password is not matching'});
        const hashPassword= await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashPassword,name:`${firstName} ${lastName}`});
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'});

         res.status(200).json({result,token});
         console.log(result);
         console.log(token);
    }catch(e){
        res.status(500).json({"message":'Something went wrong'});
        console.log(e);
    }
   


}