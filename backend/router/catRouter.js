import express from 'express';
import { deleteCategory, getCategories, saveCategory, updateCategory } from '../controller/catController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router= express.Router();

router.get('/categories', getCategories);
router.post('/categories',authMiddleware, saveCategory);
router.patch('/categories/:id',authMiddleware, updateCategory);
router.delete('/categories/:id',authMiddleware, deleteCategory);

export default router;