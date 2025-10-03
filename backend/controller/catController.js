import Category from '../models/catModels.js';
import handleError from '../utils/errorhandler.js';
const getCategories= async (req,res)=>{
    try {
     const users= await Category.find();
    res.status(201).json(users)   
    } catch (error) {
    handleError(error,res)  
    }
}

const saveCategory=async(req, res)=>{
    try {
       const category = new Category(req.body);
        const catExists = await Category.findOne({name:req.body.name})
        if(catExists){
            return res.status(400).json({ message: "Category already exists" });
        }
       const savedCategory=await category.save();
       res.status(201).json(savedCategory)
    } catch (error) {
        handleError(error,res)
    }
}
const updateCategory=async(req, res)=>{
    try {
       const {id} = req.params;
        const catExists = await Category.findOne({_id:id})
        if(!catExists){
            return res.status(400).json({ message: "Category not found" });
        }
       const updatedCategory=await Category.findByIdAndUpdate(id, req.body, {new:true})
       res.status(201).json(updatedCategory)
    } catch (error) {
        handleError(error,res)
    }
}
const deleteCategory=async(req, res)=>{
    try {
       const {id} = req.params;
        const catExists = await Category.findOne({_id:id})
        if(!catExists){
            return res.status(400).json({ message: "Category not found" });
        }
       const deletedCategory=await Category.findByIdAndDelete(id)
       res.status(201).json(deletedCategory)
    } catch (error) {
        handleError(error,res)
    }
}
export {getCategories,saveCategory,updateCategory,deleteCategory}