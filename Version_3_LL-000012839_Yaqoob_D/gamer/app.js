// Import required modules
import fs from 'fs';
import express from 'express';  // Express framework for creating the web server
import session from 'express-session';  // Middleware for handling sessions
import bodyParser from 'body-parser';  // Middleware for parsing incoming request bodies
import path from 'path';  // Utility for handling file and directory paths
import { fileURLToPath } from 'url';  // Utility for converting file URL to path
import dotenv from 'dotenv';  // To load environment variables from a .env file
import passport from './config/passportConfig.js';  // Passport for authentication configuration

// Initialize environment variables from .env file
dotenv.config();

// Get the current file's path and directory for resolving paths
const __filename = fileURLToPath(import.meta.url);  // Current file path
const __dirname = path.dirname(__filename);  // Directory name of the current file

// Initialize the express application
const app = express();

// Set the port for the server, using an environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies (from forms, etc.)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'rolsa-secret-key',  // Session secret (use a secure one in production)
    resave: false,  // Don't force a session to be saved on every request
    saveUninitialized: false  // Don't create a session until something is stored
}));

// Initialize Passport authentication middleware
app.use(passport.initialize());
app.use(passport.authenticate('session'));  // Use passport's session authentication

// Global middleware for setting variables in EJS templates
app.use((req, res, next) => {
    res.locals.user = req.user || null;  // Set user info for templates (if authenticated)
    res.locals.query = req.query;  // Pass query parameters to templates
    res.locals.title = 'Rolsa Technologies';  // Set default page title
    next();  // Continue to the next middleware
});

// Set EJS as the view engine and define the views directory
app.set('view engine', 'ejs');  // EJS is used for rendering views
app.set('views', path.join(__dirname, 'views'));  // Views are stored in the 'views' directory

/// Import and configure routes
import authRoutes from './routes/auth.js';  // Authentication routes
import dashboardRoutes from './routes/dashboard.js';  // Dashboard routes
import scheduleRoutes from './routes/schedule.js';  // Schedule routes
import calculatorRoutes from './routes/calculator.js';  // Calculator routes
import productsRoutes from './routes/products.js';  // Products routes
import policiesRoutes from './routes/policies.js';  // Policies routes

// Use the imported routes
app.use('/', policiesRoutes);  // Policies routes available at the root
app.use('/', authRoutes);  // Auth routes also available at the root
app.use('/dashboard', dashboardRoutes);  // Dashboard routes available at /dashboard
app.use('/schedule', scheduleRoutes);  // Schedule routes available at /schedule
app.use('/calculator', calculatorRoutes);  // Calculator routes available at /calculator
app.use('/products', productsRoutes);  // Products routes available at /products

// Accessibility route
app.get('/accessibility', (req, res) => {
  res.render('accessibility');
});
// Route to serve the terms and conditions page
app.get('/terms', (req, res) => {
    res.render('terms', { 
        title: 'Terms and Conditions',
        query: req.query
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);  // Log to console when the server is running
});
// Add to your app.js
app.get('/debug-css', (req, res) => {
    const cssPath = path.join(__dirname, 'public/css/smart-home.css');
    
    // Check if file exists
    if (fs.existsSync(cssPath)) {
      console.log('File exists at:', cssPath);
      res.type('text/css'); // Set correct MIME type
      res.sendFile(cssPath);
    } else {
      console.log('File NOT found at:', cssPath);
      res.status(404).send('CSS file not found');
    }
  });