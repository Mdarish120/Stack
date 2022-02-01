import mongoose from "mongoose";

const postScheme=mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date
    }

});


const PostMsg= mongoose.model('PostMsg', postScheme);

export default PostMsg;