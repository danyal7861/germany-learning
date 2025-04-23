// routes/policies.js
import express from 'express'; // Import express to create and handle routes

// Create a new Express Router instance
const router = express.Router(); 

// Route to render the privacy policy page
router.get('/privacy-policy', (req, res) => {
  // When a user visits the "/privacy-policy" route, render the 'privacy-policy' view
  res.render('privacy-policy');
});

// Route to render the cookie policy page
router.get('/cookie-policy', (req, res) => {
  // When a user visits the "/cookie-policy" route, render the 'cookie-policy' view
  res.render('cookie-policy');
});

// Route to render the terms of use page
router.get('/terms-of-use', (req, res) => {
  console.log('Terms of use route accessed'); // Log to the console when this route is accessed
  // When a user visits the "/terms-of-use" route, render the 'terms-of-use' view
  res.render('terms-of-use');
});

// Export the router so it can be used in other parts of the application
export default router;
