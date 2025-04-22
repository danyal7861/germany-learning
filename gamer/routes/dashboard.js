import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
import { isAuthenticated } from '../utils/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all dashboard routes
router.use(isAuthenticated);

// Dashboard home
router.get('/', dashboardController.getDashboard);

export default router;