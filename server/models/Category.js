import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    }
},
{timestamps:true}
);



const Category= mongoose.model("Category",categorySchema);
export {Category};