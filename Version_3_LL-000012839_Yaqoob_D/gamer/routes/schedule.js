// Import necessary modules and controllers
import express from 'express'; // Import Express for routing
import * as scheduleController from '../controllers/scheduleController.js'; // Import all functions from the scheduleController.js
import { isAuthenticated } from '../utils/authMiddleware.js'; // Import the authentication middleware

// Create a new Express Router instance
const router = express.Router();

// Apply authentication middleware to all routes in this file
// This ensures that only authenticated users can access any scheduling routes
router.use(isAuthenticated);

// Route to display the scheduling form
router.get('/', scheduleController.getSchedule);
// When a user accesses the /schedule route, call the getSchedule function from scheduleController to render the form for scheduling an appointment

// Route to process the scheduling form and create a new appointment
router.post('/', scheduleController.createAppointment);
// When the scheduling form is submitted via POST, call the createAppointment function from scheduleController to process the form data and create an appointment

// Route to view scheduled appointments
router.get('/appointments', scheduleController.getAppointments);
// When a user visits the /schedule/appointments route, call the getAppointments function from scheduleController to fetch and render the list of all scheduled appointments

// Route to cancel an appointment
router.post('/cancel/:id', scheduleController.cancelAppointment); 
// When the user cancels an appointment, this route will be triggered with the appointment ID as a parameter. 
// The cancelAppointment function will handle updating the appointment's status to "cancelled" in the database.
// Ensure that the form action in your front-end matches this route to properly cancel appointments.
  
// Export the router so it can be used in the main app file
export default router;
