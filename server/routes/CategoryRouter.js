import express from 'express'
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controller/CategoryController.js";
const categoryRouter=express.Router();
categoryRouter.post('/',createCategory);
categoryRouter.get('/',getCategory);
categoryRouter.get('/:id',getCategoryById);
categoryRouter.put('/:id',updateCategory);
categoryRouter.delete('/:id',deleteCategory);
export default categoryRouter;