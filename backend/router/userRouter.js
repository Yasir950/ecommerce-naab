import express from 'express';
import  {deleteUser, getUsers, saveUser, updatedUsers}  from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router= express.Router();

router.get('/users', getUsers);
router.post('/users', saveUser);
router.patch('/users/:id',authMiddleware, updatedUsers);
router.delete('/users/:id',authMiddleware, deleteUser);

export default router;