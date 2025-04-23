// Import necessary modules and functions
import express from 'express'; // Import express to create and handle routes
import * as dashboardController from '../controllers/dashboardController.js'; // Import all functions from the dashboard controller
import { isAuthenticated } from '../utils/authMiddleware.js'; // Import authentication middleware to ensure the user is logged in

const router = express.Router(); // Create a new Express router instance

// Apply authentication middleware to all routes in this router
router.use(isAuthenticated); // Every route in this router will require the user to be authenticated before accessing it

// Dashboard home route
router.get('/', dashboardController.getDashboard); // When the user visits the root of the dashboard (i.e., '/'), call `getDashboard` to render the dashboard page

// Export the router so it can be used in other parts of the application
export default router;
