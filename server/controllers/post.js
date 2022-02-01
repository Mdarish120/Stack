import mongoose from "mongoose";
import PostMsg from "../models/postMessage.js";
export const getPosts=async (req,res)=>{
    const {page}=req.query;
   

   try{
      const LIMIT=8;
      const startIndex=(Number(page)-1)*8;
      const total=await PostMsg.countDocuments({});
      
       const posts=await PostMsg.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);

       res.status(200).json({data:posts,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
      
   }
   catch(e){

       res.status(404).json({message : e.message});

   }
}

export const getPostsBySearch=async (req,res)=>{

   const {searchQuery,tags}=req.query;
 try{
     const title=new RegExp(searchQuery,'i');
     const posts=await PostMsg.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
     res.json({data:posts});

 }catch(e){
   res.status(404).json({message:e.message});
 }
}

export const createPost=async (req,res)=>{
  
    const post =req.body;
    const newPost=new PostMsg({...post,creator:req.userId,createdAt:new Date().toISOString()});
   try{
          await newPost.save();

          res.status(201).json(newPost);
   }
   catch(e){
       res.status(404).json({message : e.message});
   }
 
}

export const updatePost=async (req,res)=>{
const {id} = req.params;
const {title,message,creator,selectedFile,tags}=req.body;

 if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
 const post={title,message,creator,selectedFile,tags,_id:id};

  await PostMsg.findByIdAndUpdate(id,post,{new :true});

 res.json(post);

}

export const deletePost=async (req,res)=>{

   const {id} =req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
   await PostMsg.findByIdAndRemove(id);

   res.json({message: "Post deleted successfully"});



}

export const likePost = async (req, res) => {
   const { id } = req.params;

     
   if (!req.userId) {
       return res.json({ message: "Unauthenticated" });
     }

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
   
   const post = await PostMsg.findById(id);

   const index = post.likes.findIndex((id) => id ===String(req.userId));

   if (index === -1) {
     post.likes.push(req.userId);
   } else {
     post.likes = post.likes.filter((id) => id !== String(req.userId));
   }
   const updatedPost = await PostMsg.findByIdAndUpdate(id, post, { new: true });
   res.status(200).json(updatedPost);
}

