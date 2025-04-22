import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';
import { isAuthenticated } from '../utils/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware
router.use(isAuthenticated);

// Scheduling form
router.get('/', scheduleController.getSchedule);

// Process scheduling form
router.post('/', scheduleController.createAppointment);

// View scheduled appointments
router.get('/appointments', scheduleController.getAppointments);

// Cancel appointment
router.post('/cancel/:id', scheduleController.cancelAppointment); // Ensure this matches the form action

export default router;