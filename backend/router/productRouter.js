import express from 'express';
import { deleteProduct, getProducts, saveProduct, updateProduct } from '../controller/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router= express.Router();

router.get('/products', getProducts);
router.post('/products',authMiddleware, saveProduct);
router.patch('/products/:id',authMiddleware, updateProduct);
router.delete('/products/:id',authMiddleware, deleteProduct);

export default router;