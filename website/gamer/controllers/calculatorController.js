import db from '../models/db.js';
import { 
  calculateElectricityFootprint,
  calculateGasFootprint,
  calculateVehicleFootprint 
} from '../utils/carbonAPI.js';

export const getCalculator = (req, res) => {
  res.render('calculator', {
    user: req.user,
    result: null,
    error: null
  });
};

export const calculateFootprint = async (req, res) => {
  try {
    const { electricityUsage, gasUsage, vehicleMiles, flights } = req.body;

    // Validate inputs (removed vehicleMpg check)
    if (!electricityUsage || !gasUsage || !vehicleMiles || flights === undefined) {
      throw new Error('All fields are required');
    }

    // Calculate carbon footprint
    const [electricityRes, gasRes, vehicleRes] = await Promise.all([
      calculateElectricityFootprint(electricityUsage * 12), // Annual
      calculateGasFootprint(gasUsage * 12), // Annual
      calculateVehicleFootprint(vehicleMiles * 12) // Removed vehicleMpg
    ]);

    const result = {
      totalFootprint: electricityRes + gasRes + vehicleRes + (flights * 0.2), // Flights: 0.2 tons CO₂ per flight
      breakdown: {
        electricity: electricityRes,
        gas: gasRes,
        vehicle: vehicleRes,
        flights: flights * 0.2
      }
    };

    // Save to database
    if (req.user) {
      await db.query(
        `INSERT INTO carbon_footprints SET ?`,
        {
          user_id: req.user.id,
          total_footprint: result.totalFootprint,
          electricity: result.breakdown.electricity,
          gas: result.breakdown.gas,
          vehicle: result.breakdown.vehicle,
          flights: result.breakdown.flights,
          diet: 0 // Not implemented yet
        }
      );
    }

    res.render('calculator', {
      user: req.user,
      result,
      error: null
    });

  } catch (error) {
    console.error('Calculator error:', error);
    res.render('calculator', {
      user: req.user,
      result: null,
      error: error.message || 'Failed to calculate footprint. Please try again.'
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM carbon_footprints WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.render('calculator-history', {
      user: req.user,
      results
    });
  } catch (error) {
    console.error('History error:', error);
    res.render('calculator-history', {
      user: req.user,
      results: [],
      error: 'Error loading history'
    });
  }
};

export default {
  getCalculator,
  calculateFootprint,
  getHistory
};
