import {Category} from "../models/Category.js";

export const createCategory=async (req,res)=>{
    try{
        const {categoryName,description}=req.body;
        const newCategory=new Category({
            categoryName,
            description
        });
        await newCategory.save();
        res.status(201).json({message:'Category created successfully',category:newCategory});
    }catch(error){
        res.status(500).json({message:'Error creating category',error});
    }
};

export const getCategory=async(req,res)=>{
    try{
        const categories=await Category.find();
        res.status(200).json({categories});
    }catch(error){
        res.status(500).json({message:"Error fetching category",error});
    }
};

export const getCategoryById=async (req,res)=>{
    try{
        const category=await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:'Category not found'});
        }
        res.status(200).json({message:'user found',category});
    }catch(error){
        res.status(500).json({message:'Error in fetching category',error});
    }
};

export const updateCategory=async (req,res)=>{
    try{
        const {categoryName,description}=req.body;
        const category=await Category.findByIdAndUpdate(
            req.params.id,
            {categoryName,description},
            {new:true}
        );
        if(!category){
            return res.status(400).json({message:'Category not found'});
        }
        res.status(200).json({message:'Category updated successfully',category});
    }catch(error){
        res.status(500).json({message:'Error updating category',error});
    }
}

export const deleteCategory=async(req,res)=>{
    try{
        const category=await Category.findByIdAndDelete(req.params.id);
        if(!category){
            res.status(400).json({message:'category not found'});
        }
        res.status(200).json({message:'user deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Error in Deleting category'});
    }
}