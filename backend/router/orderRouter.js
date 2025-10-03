import express from 'express'
import { getOrders, getOrdersByUserId, saveOrder, updateOrder } from '../controller/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/orders',authMiddleware, getOrders);
router.get('/orders/:id', getOrdersByUserId);
router.post('/orders', saveOrder);
router.patch('/orders/:id',authMiddleware, updateOrder);
export default router;