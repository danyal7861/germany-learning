import express from 'express';
import * as productsController from '../controllers/productsController.js';

document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        let dropdown = new bootstrap.Dropdown(this);
        dropdown.toggle();
    });
});

const router = express.Router();

// Products overview
router.get('/', productsController.getProducts);

// Product detail pages
router.get('/solar', productsController.getSolarProducts);
router.get('/ev-charging', productsController.getEvProducts);
router.get('/smart-home', productsController.getSmartHomeProducts);

export default router;