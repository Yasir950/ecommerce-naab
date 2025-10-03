import express from 'express';
import {  userLogin } from '../controller/authController.js';
const router= express.Router();

router.post("/user_login", userLogin(false));
router.post("/admin_login", userLogin(true));

export default router