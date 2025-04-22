import axios from 'axios';

const headers = {
  Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
  'Content-Type': 'application/json'
};

export const fetchVehicleModels = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', { headers });
    console.log('Vehicle Models:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle models:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch vehicle models');
  }
};

export const calculateElectricityFootprint = async (kwh) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'electricity',
      electricity_unit: 'kwh',
      electricity_value: kwh,
      country: 'GB'
    }, { headers });

    console.log('Electricity API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    console.error('Electricity API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate electricity footprint');
  }
};

export const calculateGasFootprint = async (therms) => {
  try {
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'fuel_combustion',
      fuel_source_type: 'dfo',
      fuel_source_unit: 'btu',
      fuel_source_value: 2,
      country: 'GB'
    }, { headers });

    console.log('Gas API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    console.error('Gas API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate gas footprint');
  }
};


export const calculateVehicleFootprint = async (miles) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
      'Content-Type': 'application/json'
    };

    // Fetch vehicle makes
    const makesResponse = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', { headers });
    const toyota = makesResponse.data.find(make => make.data.attributes.name === 'Toyota');

    if (!toyota) {
      throw new Error('Toyota not found in vehicle makes');
    }

    // Fetch models for Toyota
    const modelsResponse = await axios.get(`https://www.carboninterface.com/api/v1/vehicle_makes/${toyota.data.id}/vehicle_models`, { headers });
    const corolla = modelsResponse.data.find(model => model.data.attributes.name.includes('Corolla'));

    if (!corolla) {
      throw new Error('Toyota Corolla not found in vehicle models');
    }

    // Use Corolla model ID for footprint calculation
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'vehicle',
      distance_unit: 'mi',
      distance_value: miles,
      vehicle_model_id: corolla.data.id
    }, { headers });

    console.log('Vehicle API Response:', response.data);
    return response.data.data.attributes.carbon_kg / 1000; // Convert to tons
  } catch (error) {
    console.error('Vehicle API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to calculate vehicle footprint');
  }
};
