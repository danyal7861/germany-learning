// Import necessary modules and functions
import express from 'express'; // Import express to create and handle routes
import { 
  getCalculator,       // Import the function to render the carbon footprint calculator page
  calculateFootprint,  // Import the function to handle the footprint calculation logic
  getHistory           // Import the function to retrieve and display the user's calculation history
} from '../controllers/calculatorController.js'; // Import the controller functions for handling the routes

import { isAuthenticated } from '../utils/authMiddleware.js'; // Import middleware to check if the user is authenticated

const router = express.Router(); // Create a new instance of an Express router

// Apply the authentication middleware to all routes in this router
router.use(isAuthenticated);

// Route to render the carbon footprint calculator page (GET request)
router.get('/', getCalculator); // When a user visits the root route of this path, the `getCalculator` function is called to render the page

// Route to calculate the carbon footprint (POST request)
router.post('/', calculateFootprint); // When a user submits the form on the calculator page, the `calculateFootprint` function is called to process the data

// Route to show the user's calculation history (GET request)
router.get('/history', getHistory); // When a user visits the '/history' route, the `getHistory` function is called to show previously calculated footprints

export default router; // Export the router so it can be used in other parts of the application
