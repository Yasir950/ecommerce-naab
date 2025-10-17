import express from 'express';
import { getCounts, getGraphData } from '../controller/dashboardController.js';
const router = express.Router();
router.get('/dashboard', getCounts);
router.get('/graph', getGraphData);
export default router;