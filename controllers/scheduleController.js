import db from '../models/db.js';

// Display scheduling form
export const getSchedule = (req, res) => {
  res.render('schedule', {
    user: req.user || null,
    services: [
      { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
      { id: 'ev', name: 'EV Charging Station' },
      { id: 'smart', name: 'Smart Home Energy Management' }
    ],
    success: req.query.success,
    error: null, // Initialize error as null
    formData: null // Initialize formData as null
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
    } = req.body;

    // Validate form data
    if (!service || !date || !time || !address || !city || !state || !zip) {
      return res.render('schedule', {
        user: req.user || null,
        services: [
          { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
          { id: 'ev', name: 'EV Charging Station' },
          { id: 'smart', name: 'Smart Home Energy Management' }
        ],
        success: null,
        error: 'All fields are required',
        formData: req.body
      });
    }

    // Format date and time
    const appointmentDate = new Date(`${date}T${time}:00`).toISOString().slice(0, 19).replace('T', ' ');

    // Create appointment in database
    await db.query(
      `INSERT INTO appointments 
       (user_id, service_type, appointment_date, address, city, state, zip, notes, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'scheduled', NOW())`,
      [
        req.user.id,
        service,
        appointmentDate,
        address,
        city,
        state,
        zip,
        notes || ''
      ]
    );

    res.redirect('/schedule?success=true');
  } catch (error) {
    console.error('Scheduling error:', error);
    res.render('schedule', {
      user: req.user || null,
      services: [
        { id: 'solar', name: 'Solar Panel Installation/Maintenance' },
        { id: 'ev', name: 'EV Charging Station' },
        { id: 'smart', name: 'Smart Home Energy Management' }
      ],
      success: null,
      error: 'Error scheduling appointment. Please try again.',
      formData: req.body
    });
  }
};

// Display list of appointments
// Display list of appointments
export const getAppointments = async (req, res) => {
  try {
      const [appointments] = await db.query(
          'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date ASC',
          [req.user.id]
      );

      res.render('appointments', {
          user: req.user || null,
          appointments,
          success: req.query.success || null,
          error: req.query.error || null
      });
  } catch (error) {
      console.error('Appointments error:', error);
      res.render('appointments', {
          user: req.user || null,
          appointments: [],
          error: 'Error loading appointments'
      });
  }
};
// Cancel appointment
// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
      const appointmentId = req.params.id;

      // Update appointment status to 'cancelled'
      await db.query(
          'UPDATE appointments SET status = "cancelled" WHERE id = ? AND user_id = ?',
          [appointmentId, req.user.id]
      );

      // Redirect with success message
      res.redirect('/schedule/appointments?success=Appointment cancelled successfully');
  } catch (error) {
      console.error('Cancel error:', error);
      res.redirect('/schedule/appointments?error=Error cancelling appointment');
  }
};