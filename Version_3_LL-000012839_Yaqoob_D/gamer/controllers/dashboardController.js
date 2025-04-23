// Import the database connection
import db from '../models/db.js';

// Controller to display the dashboard page
export const getDashboard = async (req, res) => {
  try {
    // Query the database for the user's upcoming appointments, ordered by date
    const [appointments] = await db.query(
      'SELECT * FROM appointments WHERE user_id = ? AND appointment_date >= CURDATE() ORDER BY appointment_date ASC LIMIT 5',
      [req.user.id]  // Use the logged-in user's ID to filter appointments
    );
    
    // Query the database for the most recent carbon footprint data for the user
    const [carbonRows] = await db.query(
      'SELECT * FROM carbon_footprints WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [req.user.id]  // Use the logged-in user's ID to fetch their latest footprint data
    );

    // Initialize carbonData as null in case no data is found
    let carbonData = null;
    if (carbonRows.length > 0) {
      // Convert the relevant numeric fields to numbers for proper processing
      carbonData = {
        total_footprint: Number(carbonRows[0].total_footprint),  // Total carbon footprint
        electricity: Number(carbonRows[0].electricity),          // Carbon footprint from electricity
        gas: Number(carbonRows[0].gas),                          // Carbon footprint from gas usage
        vehicle: Number(carbonRows[0].vehicle),                  // Carbon footprint from vehicle usage
        flights: Number(carbonRows[0].flights)                   // Carbon footprint from flights
      };
    }

    // Render the 'dashboard' view with the user's data
    res.render('dashboard', {
      user: req.user,        // Pass user data (e.g., name, id)
      appointments: appointments, // Pass the user's upcoming appointments
      carbonData: carbonData  // Pass the user's most recent carbon footprint data
    });
    
  } catch (error) {
    // If an error occurs, log it and render the dashboard with error handling
    console.error('Dashboard error:', error);
    res.render('dashboard', {
      user: req.user,        // Pass user data
      appointments: [],      // No appointments in case of error
      carbonData: null,      // No carbon data in case of error
      error: 'Error loading dashboard data' // Display a generic error message
    });
  }
};
