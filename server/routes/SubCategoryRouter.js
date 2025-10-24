import { createSubCategory, deleteSubCategory, getSubCategories, getSubCategoryById, updateSubCategory } from "../controller/SubCategoryController.js";
import express from 'express';
const subCategoryRouter=express.Router();
subCategoryRouter.post('/',createSubCategory);
subCategoryRouter.get('/', getSubCategories); 
subCategoryRouter.get('/:id',getSubCategoryById);
subCategoryRouter.put('/:id',updateSubCategory) ;
subCategoryRouter.delete('/:id',deleteSubCategory)
export default subCategoryRouter;