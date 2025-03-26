import db from '../models/db.js';

// Display dashboard
export const getDashboard = async (req, res) => {
  try {
    // Get user's upcoming appointments
    const [appointments] = await db.query(
      'SELECT * FROM appointments WHERE user_id = ? AND appointment_date >= CURDATE() ORDER BY appointment_date ASC LIMIT 5',
      [req.user.id]
    );
    
    // Get user's carbon footprint data
    const [carbonRows] = await db.query(
      'SELECT * FROM carbon_footprints WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );

    // Convert numeric fields to numbers
    let carbonData = null;
    if (carbonRows.length > 0) {
      carbonData = {
        total_footprint: Number(carbonRows[0].total_footprint),
        electricity: Number(carbonRows[0].electricity),
        gas: Number(carbonRows[0].gas),
        vehicle: Number(carbonRows[0].vehicle),
        flights: Number(carbonRows[0].flights)
      };
    }

    res.render('dashboard', {
      user: req.user,
      appointments: appointments,
      carbonData: carbonData
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('dashboard', {
      user: req.user,
      appointments: [],
      carbonData: null,
      error: 'Error loading dashboard data'
    });
  }
};