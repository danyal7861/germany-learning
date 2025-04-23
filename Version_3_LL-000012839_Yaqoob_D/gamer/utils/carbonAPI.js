import axios from 'axios';

// Set the headers for API requests, including the authorization token from environment variables
const headers = {
  Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
  'Content-Type': 'application/json'
};

// Fetch vehicle models (make and models list)
export const fetchVehicleModels = async () => {
  try {
    // Fetch vehicle makes (list of car brands)
    const response = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', { headers });

    // Log and return the data received from the API
    console.log('Vehicle Models:', response.data);
    return response.data;
  } catch (error) {
    // Handle errors and log appropriate messages
    console.error('Error fetching vehicle models:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch vehicle models');
  }
};

// Calculate electricity carbon footprint from kWh usage
export const calculateElectricityFootprint = async (kwh) => {
  try {
    // Make a POST request to calculate the carbon footprint for electricity
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'electricity',              // Specify the type as electricity
      electricity_unit: 'kwh',          // Specify the unit as kWh
      electricity_value: kwh,           // The value in kWh
      country: 'GB'                     // The country for the calculation (GB = Great Britain)
    }, { headers });

    // Log and return the carbon footprint in tons
    console.log('Electricity API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    // Handle errors and log appropriate messages
    console.error('Electricity API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate electricity footprint');
  }
};

// Calculate gas carbon footprint from therms used
export const calculateGasFootprint = async (therms) => {
  try {
    // Make a POST request to calculate the carbon footprint for gas usage
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'fuel_combustion',           // Specify the type as fuel combustion
      fuel_source_type: 'dfo',           // The fuel source (dfo = diesel fuel oil)
      fuel_source_unit: 'btu',           // The unit (btu = British thermal units)
      fuel_source_value: 2,              // The fuel consumption value (example value)
      country: 'GB'                      // The country for the calculation (GB = Great Britain)
    }, { headers });

    // Log and return the carbon footprint in tons
    console.log('Gas API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    // Handle errors and log appropriate messages
    console.error('Gas API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate gas footprint');
  }
};

// Calculate vehicle carbon footprint for a specific vehicle model (e.g., Toyota Corolla) based on miles driven
export const calculateVehicleFootprint = async (miles) => {
  try {
    // Fetch the vehicle makes to find a specific make (e.g., Toyota)
    const makesResponse = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', { headers });

    // Find the Toyota make
    const toyota = makesResponse.data.find(make => make.data.attributes.name === 'Toyota');

    if (!toyota) {
      throw new Error('Toyota not found in vehicle makes'); // Handle case where Toyota is not found
    }

    // Fetch the vehicle models for Toyota
    const modelsResponse = await axios.get(`https://www.carboninterface.com/api/v1/vehicle_makes/${toyota.data.id}/vehicle_models`, { headers });

    // Find the Toyota Corolla model
    const corolla = modelsResponse.data.find(model => model.data.attributes.name.includes('Corolla'));

    if (!corolla) {
      throw new Error('Toyota Corolla not found in vehicle models'); // Handle case where Corolla is not found
    }

    // Use the Corolla model ID for footprint calculation
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'vehicle',                // Specify the type as vehicle
      distance_unit: 'mi',             // The unit for distance (miles)
      distance_value: miles,          // The number of miles driven
      vehicle_model_id: corolla.data.id // The ID of the Corolla model
    }, { headers });

    // Log and return the carbon footprint for the vehicle in tons
    console.log('Vehicle API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    // Handle errors and log appropriate messages
    console.error('Vehicle API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate vehicle footprint');
  }
};
