// Import necessary modules and controllers
import express from 'express'; // Import express to create and handle routes
import * as productsController from '../controllers/productsController.js'; // Import all functions from productsController.js

// Create a new Express Router instance
const router = express.Router();

// Route for the products overview page
router.get('/', productsController.getProducts); 
// When a user visits the root of the /products route, call getProducts from the productsController to render the products overview page

// Route for the Solar Products detail page
router.get('/solar', productsController.getSolarProducts); 
// When a user visits the /solar route, call getSolarProducts from the productsController to render the solar products page

// Route for the EV Charging Products detail page
router.get('/ev-charging', productsController.getEvProducts); 
// When a user visits the /ev-charging route, call getEvProducts from the productsController to render the EV charging products page

// Route for the Smart Home Products detail page
router.get('/smart-home', productsController.getSmartHomeProducts); 
// When a user visits the /smart-home route, call getSmartHomeProducts from the productsController to render the smart home products page

// Export the router so it can be used in other parts of the application
export default router;
