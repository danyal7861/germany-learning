// Importing necessary modules
import express from 'express'; // Import express for routing
import passport from 'passport'; // Import passport for handling authentication
import * as authController from '../controllers/authController.js'; // Import the authController for authentication-related actions

const router = express.Router(); // Create a new instance of an Express router

// Home page route
router.get('/', (req, res) => {
  // Renders the home page, passing the user object from the request (if available)
  res.render('index', { user: req.user });
});

// Login routes
router.get('/login', authController.getLogin); // Handle GET request for the login page, calling the `getLogin` method from the authController
router.post('/login', authController.postLogin); // Handle POST request for the login form submission, calling the `postLogin` method from the authController

// Register routes
router.get('/register', authController.getRegister); // Handle GET request for the registration page, calling the `getRegister` method from the authController
router.post('/register', authController.postRegister); // Handle POST request for the registration form submission, calling the `postRegister` method from the authController

// Logout route
router.get('/logout', authController.logout); // Handle GET request for logging out, calling the `logout` method from the authController

// About page route
router.get('/about', (req, res) => {
  // Renders the About page, passing the user object from the request (if available)
  res.render('about', { user: req.user });
});

export default router; // Export the router so it can be used in other parts of the application
