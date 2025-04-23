// Import the database connection
import db from '../models/db.js';

// Import utility functions for calculating carbon footprints for different activities
import { 
  calculateElectricityFootprint,  // Function to calculate carbon footprint from electricity usage
  calculateGasFootprint,          // Function to calculate carbon footprint from gas usage
  calculateVehicleFootprint       // Function to calculate carbon footprint from vehicle usage
} from '../utils/carbonAPI.js';

// Controller to render the calculator page
export const getCalculator = (req, res) => {
  // Render the 'calculator' view with user data, result and error (initially null)
  res.render('calculator', {
    user: req.user,  // User object from the session (if logged in)
    result: null,    // No result initially
    error: null      // No error initially
  });
};

// Controller to handle the footprint calculation based on user input
export const calculateFootprint = async (req, res) => {
  try {
    // Destructure inputs from the request body
    const { electricityUsage, gasUsage, vehicleMiles, flights } = req.body;

    // Validate that all required fields are provided (electricity, gas, vehicle miles, flights)
    if (!electricityUsage || !gasUsage || !vehicleMiles || flights === undefined) {
      throw new Error('All fields are required');
    }

    // Perform asynchronous calculations for carbon footprint for each category
    const [electricityRes, gasRes, vehicleRes] = await Promise.all([
      calculateElectricityFootprint(electricityUsage * 12), // Calculate annual footprint based on monthly electricity usage
      calculateGasFootprint(gasUsage * 12), // Calculate annual footprint based on monthly gas usage
      calculateVehicleFootprint(vehicleMiles * 12) // Calculate annual footprint based on monthly vehicle miles
    ]);

    // Calculate the total carbon footprint and breakdown for each category
    const result = {
      totalFootprint: electricityRes + gasRes + vehicleRes + (flights * 0.2), // Add flights' contribution (0.2 tons per flight)
      breakdown: {
        electricity: electricityRes, // Footprint from electricity
        gas: gasRes,                 // Footprint from gas
        vehicle: vehicleRes,         // Footprint from vehicle usage
        flights: flights * 0.2       // Footprint from flights
      }
    };

    // If the user is logged in, save the calculated data to the database
    if (req.user) {
      await db.query(
        `INSERT INTO carbon_footprints SET ?`,  // Insert a new record into the 'carbon_footprints' table
        {
          user_id: req.user.id,  // Store the user's ID
          total_footprint: result.totalFootprint, // Store the total footprint
          electricity: result.breakdown.electricity, // Store the electricity footprint
          gas: result.breakdown.gas,               // Store the gas footprint
          vehicle: result.breakdown.vehicle,       // Store the vehicle footprint
          flights: result.breakdown.flights,       // Store the flights footprint
          diet: 0 // Placeholder for diet, not implemented yet
        }
      );
    }

    // Render the 'calculator' page with the result and no error
    res.render('calculator', {
      user: req.user,  // Pass user data
      result,          // Pass the calculated footprint result
      error: null      // No error
    });

  } catch (error) {
    // If an error occurs during the calculation process, log the error and render the 'calculator' page with an error message
    console.error('Calculator error:', error);
    res.render('calculator', {
      user: req.user,  // Pass user data
      result: null,    // No result in case of error
      error: error.message || 'Failed to calculate footprint. Please try again.' // Display the error message
    });
  }
};

// Controller to get the user's history of previous carbon footprint calculations
export const getHistory = async (req, res) => {
  try {
    // Query the database for the user's carbon footprint history (ordered by the most recent)
    const [results] = await db.query(
      'SELECT * FROM carbon_footprints WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    // Render the 'calculator-history' page with the user's previous results
    res.render('calculator-history', {
      user: req.user,  // Pass user data
      results          // Pass the historical results
    });
  } catch (error) {
    // If there's an error retrieving the history, log the error and render the history page with an error message
    console.error('History error:', error);
    res.render('calculator-history', {
      user: req.user,  // Pass user data
      results: [],     // No results in case of error
      error: 'Error loading history' // Display a generic error message
    });
  }
};

// Export the controllers for use in the routing system
export default {
  getCalculator,    // Controller to render the calculator page
  calculateFootprint, // Controller to calculate and save the carbon footprint
  getHistory        // Controller to retrieve and display the user's calculation history
};
