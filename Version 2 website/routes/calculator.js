import express from 'express';
import { 
  getCalculator,
  calculateFootprint,
  getHistory 
} from '../controllers/calculatorController.js'; // Changed import syntax
import { isAuthenticated } from '../utils/authMiddleware.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getCalculator);
router.post('/', calculateFootprint);
router.get('/history', getHistory);

export default router;