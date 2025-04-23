/* Carbon Footprint Calculator JavaScript */

// Emission factors for carbon footprint calculation
const EMISSION_FACTORS = {
    transportation: {
        sedan: 0.404,  // metric tons CO2 per 1000 miles
        suv: 0.594,
        truck: 0.748,
        electric: 0.1,
        hybrid: 0.254,
        publicTransit: 0.2  // per 1000 miles
    },
    homeEnergy: {
        electricityBase: 0.0005,  // metric tons CO2 per kWh
        naturalGasBase: 0.005,  // metric tons CO2 per therm
        heatingMultiplier: {
            electric: 1.2,
            gas: 1,
            oil: 1.3,
            renewable: 0.2
        }
    },
    diet: {
        vegan: 1.5,
        vegetarian: 1.7,
        lowMeat: 2.5,
        highMeat: 3.3,
        foodWasteMultiplier: 0.01
    },
    waste: {
        recyclingMultiplier: {
            always: 0.5,
            sometimes: 1,
            rarely: 1.5
        },
        wasteMultiplier: 0.02
    }
};

/* Function to calculate carbon footprint */
function calculateCarbonFootprint() {
    // Transportation Calculations
    const carMileage = parseFloat(document.getElementById('carMileage').value) || 0;
    const carType = document.getElementById('carType').value;
    const publicTransit = parseFloat(document.getElementById('publicTransit').value) || 0;

    // Home Energy Calculations
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const naturalGas = parseFloat(document.getElementById('naturalGas').value) || 0;
    const heatingType = document.getElementById('heatingType').value;

    // Diet Calculations
    const meatConsumption = document.getElementById('meatConsumption').value;
    const foodWaste = parseFloat(document.getElementById('foodWaste').value) || 0;

    // Waste Management Calculations
    const recycling = document.getElementById('recycling').value;
    const wasteGeneration = parseFloat(document.getElementById('wasteGeneration').value) || 0;

    // Calculate each category's emissions and total carbon footprint
    let transportEmissions = (carMileage / 1000) * EMISSION_FACTORS.transportation[carType];
    transportEmissions += (publicTransit / 1000) * EMISSION_FACTORS.transportation.publicTransit;

    let energyEmissions = (electricity * EMISSION_FACTORS.homeEnergy.electricityBase) +
                          (naturalGas * EMISSION_FACTORS.homeEnergy.naturalGasBase);
    energyEmissions *= EMISSION_FACTORS.homeEnergy.heatingMultiplier[heatingType];

    let dietEmissions = EMISSION_FACTORS.diet[meatConsumption];
    dietEmissions += foodWaste * EMISSION_FACTORS.diet.foodWasteMultiplier;

    let wasteEmissions = wasteGeneration * EMISSION_FACTORS.waste.wasteMultiplier;
    wasteEmissions *= EMISSION_FACTORS.waste.recyclingMultiplier[recycling];

    // Calculate Total Carbon Footprint
    const totalEmissions = transportEmissions + energyEmissions + dietEmissions + wasteEmissions;

    // Display the calculated results
    document.getElementById('carbonFootprintScore').textContent = totalEmissions.toFixed(2);
    document.getElementById('results').style.display = 'block';

    // Generate Personalized Recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = ''; // Clear previous recommendations

    // Recommendations based on emissions threshold
    const recommendations = [
        totalEmissions > 10 ? "Consider switching to an electric or hybrid vehicle to reduce transportation emissions." : null,
        electricity > 500 ? "Look into energy-efficient appliances and LED lighting to reduce electricity consumption." : null,
        meatConsumption === 'highMeat' ? "Reduce meat consumption by incorporating more plant-based meals." : null,
        foodWaste > 5 ? "Plan meals carefully and compost to minimize food waste." : null,
        recycling === 'rarely' ? "Develop a comprehensive recycling strategy at home." : null
    ].filter(recommendation => recommendation !== null);

    // Display recommendations
    recommendations.forEach(recommendation => {
        const li = document.createElement('li');
        li.textContent = recommendation;
        recommendationsList.appendChild(li);
    });
}