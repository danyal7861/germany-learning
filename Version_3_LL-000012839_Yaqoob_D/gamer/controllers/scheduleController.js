import db from '../models/db.js';

// Display scheduling form
export const getSchedule = (req, res) => {
  res.render('schedule', {
    user: req.user || null,  // Pass user data to the view, or null if no user is logged in
    services: [
      { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
      { id: 'ev', name: 'EV Charging Station' },
      { id: 'smart', name: 'Smart Home Energy Management' }
    ],  // List of services available for scheduling (solar, EV, smart home)
    success: req.query.success,  // Success message if available (via query string)
    error: null,  // Initialize error as null (error will be shown if there's a problem)
    formData: null  // Initialize formData as null (populated with form data if there's an error)
  });
};

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      service,
      date,
      time,
      address,
      city,
      state,
      zip,
      notes
    } = req.body;  // Extract appointment data from the form

    // Validate form data to ensure all required fields are filled
    if (!service || !date || !time || !address || !city || !state || !zip) {
      return res.render('schedule', {
        user: req.user || null,  // Pass user data to the view
        services: [
          { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
          { id: 'ev', name: 'EV Charging Station' },
          { id: 'smart', name: 'Smart Home Energy Management' }
        ],  // List of services
        success: null,  // No success message if the form is invalid
        error: 'All fields are required',  // Error message for missing fields
        formData: req.body  // Re-populate the form with the submitted data
      });
    }

    // Format date and time into a MySQL-compatible format (YYYY-MM-DD HH:MM:SS)
    const appointmentDate = new Date(`${date}T${time}:00`).toISOString().slice(0, 19).replace('T', ' ');

    // Create appointment in the database
    await db.query(
      `INSERT INTO appointments 
       (user_id, service_type, appointment_date, address, city, state, zip, notes, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'scheduled', NOW())`,
      [
        req.user.id,  // User ID from the session
        service,  // Service selected by the user
        appointmentDate,  // Appointment date and time
        address,  // Address for the appointment
        city,  // City for the appointment
        state,  // State for the appointment
        zip,  // Zip code for the appointment
        notes || ''  // Optional notes, default to empty string if not provided
      ]
    );

    // Redirect back to the schedule page with a success message in the URL
    res.redirect('/schedule?success=true');
  } catch (error) {
    console.error('Scheduling error:', error);
    res.render('schedule', {
      user: req.user || null,  // Pass user data to the view
      services: [
        { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
        { id: 'ev', name: 'EV Charging Station' },
        { id: 'smart', name: 'Smart Home Energy Management' }
      ],  // List of services
      success: null,  // No success message if there's an error
      error: 'Error scheduling appointment. Please try again.',  // Error message for any issues
      formData: req.body  // Re-populate the form with the submitted data
    });
  }
};

// Display list of appointments
export const getAppointments = async (req, res) => {
  try {
    // Query the database for appointments for the logged-in user
    const [appointments] = await db.query(
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date ASC',
      [req.user.id]  // Fetch appointments for the logged-in user
    );

    res.render('appointments', {
      user: req.user || null,  // Pass user data to the view
      appointments,  // List of appointments to display
      success: req.query.success || null,  // Success message (from query string)
      error: req.query.error || null  // Error message (from query string)
    });
  } catch (error) {
    console.error('Appointments error:', error);
    res.render('appointments', {
      user: req.user || null,  // Pass user data to the view
      appointments: [],  // No appointments if there's an error
      error: 'Error loading appointments'  // Error message for failed appointment fetch
    });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;  // Get the appointment ID from the URL parameter

    // Update the appointment status to 'cancelled' in the database
    await db.query(
      'UPDATE appointments SET status = "cancelled" WHERE id = ? AND user_id = ?',
      [appointmentId, req.user.id]  // Ensure the user is canceling their own appointment
    );

    // Redirect to appointments page with a success message
    res.redirect('/schedule/appointments?success=Appointment cancelled successfully');
  } catch (error) {
    console.error('Cancel error:', error);
    // Redirect to appointments page with an error message
    res.redirect('/schedule/appointments?error=Error cancelling appointment');
  }
};
