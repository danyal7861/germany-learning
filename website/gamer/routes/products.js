import express from 'express';
import * as productsController from '../controllers/productsController.js';

const router = express.Router();

// Products overview
router.get('/', productsController.getProducts);

// Product detail pages
router.get('/solar', productsController.getSolarProducts);
router.get('/ev-charging', productsController.getEvProducts);
router.get('/smart-home', productsController.getSmartHomeProducts);

export default router;