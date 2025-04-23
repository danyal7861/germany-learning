// Controller to render the main products overview page
export const getProducts = (req, res) => {
  res.render('products', {
    user: req.user,  // Pass user data to the view
    categories: [
      {
        id: 'solar',
        name: 'Solar Panel Solutions',  // Name of the product category
        image: '/images/solar-panels.jpeg',  // Image to display for the category
        description: 'Harness the power of the sun with our efficient solar panel systems.'  // Short description of the category
      },
      {
        id: 'ev-charging',
        name: 'EV Charging Stations',
        image: '/images/ev-charging.webp',
        description: 'Power your electric vehicle with convenient home charging solutions.'
      },
      {
        id: 'smart-home',
        name: 'Smart Home Energy Management',
        image: '/images/smart-home.jpg',
        description: 'Optimize your home\'s energy usage with intelligent automation.'
      }
    ]  // Array of categories for different product offerings
  });
};

// Controller to render the solar products page
export const getSolarProducts = (req, res) => {
  res.render('products-solar', {
    user: req.user,  // Pass user data to the view
    products: [
      {
        id: 'solar-panel-basic',
        name: 'EcoSolar Basic Panel',  // Product name
        image: '/images/solar-basic.jpg',  // Image of the product
        description: 'Our entry-level solar panel with 300W capacity, perfect for small homes.',  // Description of the product
        features: [
          '300W capacity', 
          '15-year warranty', 
          '17% efficiency rating', 
          'Simple installation'
        ],  // Features of the product
        price: 'Starting at $5,000'  // Price of the product
      },
      {
        id: 'solar-panel-pro',
        name: 'EcoSolar Pro Panel',
        image: '/images/solar-pro.jpg',
        description: 'Our professional-grade solar panel with 400W capacity for maximum energy production.',
        features: [
          '400W capacity',
          '25-year warranty',
          '21% efficiency rating',
          'Weather-resistant design'
        ],
        price: 'Starting at $7,500'
      },
      {
        id: 'solar-battery',
        name: 'EcoStorage Battery',
        image: '/images/solar-battery.jpg',
        description: 'Store excess solar energy for use during nighttime or power outages.',
        features: [
          '10kWh capacity',
          '10-year warranty',
          'Compact design',
          'Smartphone monitoring'
        ],
        price: 'Starting at $8,000'
      }
    ]  // Array of solar products
  });
};

// Controller to render the EV charging products page
export const getEvProducts = (req, res) => {
  res.render('products-ev', {
    user: req.user,  // Pass user data to the view
    products: [
      {
        id: 'ev-charger-basic',
        name: 'EcoCharge Home Basic',
        image: '/images/ev-basic.jpg',
        description: 'Level 2 home charging station for standard electric vehicles.',
        features: [
          '32A/7.7kW charging',
          'Universal compatibility',
          '25-foot cable',
          'Wall-mounted design'
        ],
        price: 'Starting at $599'
      },
      {
        id: 'ev-charger-pro',
        name: 'EcoCharge Pro',
        image: '/images/ev-pro.jpg',
        description: 'Our advanced Level 2 charger with smart features and faster charging.',
        features: [
          '48A/11.5kW charging',
          'Smartphone app control',
          'Energy usage monitoring',
          'Schedule charging during off-peak hours'
        ],
        price: 'Starting at $899'
      },
      {
        id: 'ev-charger-commercial',
        name: 'EcoCharge Commercial',
        image: '/images/ev-commercial.jpg',
        description: 'Multi-vehicle charging solution for businesses and multi-family properties.',
        features: [
          'Support for 2-10 vehicles',
          'Payment integration',
          'Load balancing',
          'User management'
        ],
        price: 'Custom pricing'
      }
    ]  // Array of EV charging products
  });
};

// Controller to render the smart home products page
export const getSmartHomeProducts = (req, res) => {
  res.render('products-smart-home', {
    user: req.user,  // Pass user data to the view
    products: [
      {
        id: 'smart-thermostat',
        name: 'EcoTemp Smart Thermostat',
        image: '/images/smart-thermostat.jpg',
        description: 'Intelligent temperature control that learns your preferences and saves energy.',
        features: [
          'AI-powered learning',
          'Smartphone control',
          'Energy usage reports',
          'Compatible with most HVAC systems'
        ],
        price: '$249'
      },
      {
        id: 'smart-lighting',
        name: 'EcoLight Smart Lighting System',
        image: '/images/smart-lighting.jpg',
        description: 'Energy-efficient LED lighting with automated scheduling and remote control.',
        features: [
          'Motion sensing',
          'Dimmable options',
          'Color temperature control',
          'Voice assistant compatible'
        ],
        price: 'Starting at $199'
      },
      {
        id: 'energy-monitor',
        name: 'EcoMonitor Home Energy System',
        image: '/images/energy-monitor.jpg',
        description: 'Real-time monitoring of your home\'s energy usage with insights and recommendations.',
        features: [
          'Appliance-level tracking',
          'Monthly reports',
          'Energy-saving suggestions',
          'Anomaly detection'
        ],
        price: '$349'
      }
    ]  // Array of smart home products
  });
};
