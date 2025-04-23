-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,                   -- Unique identifier for each user (auto-increments).
    name VARCHAR(255) NOT NULL,                           -- User's full name. This field is required.
    email VARCHAR(255) NOT NULL UNIQUE,                   -- User's email address. Must be unique across all users.
    password VARCHAR(255) NOT NULL,                       -- User's password (in plaintext). This field is required.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP        -- Timestamp of when the user account was created. Defaults to the current time.
);

-- Appointments table
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,                   -- Unique identifier for each appointment.
    user_id INT NOT NULL,                                 -- The user who created the appointment (foreign key reference).
    service_type ENUM('solar', 'ev', 'smart') NOT NULL,   -- Type of service (solar, electric vehicle, or smart).
    appointment_date DATETIME NOT NULL,                   -- Date and time for the scheduled appointment (required).
    address VARCHAR(255) NOT NULL,                        -- Street address for the appointment location (required).
    city VARCHAR(100) NOT NULL,                           -- City for the appointment location (required).
    state VARCHAR(50) NOT NULL,                           -- State for the appointment location (required).
    zip VARCHAR(20) NOT NULL,                             -- ZIP code for the appointment location (required).
    notes TEXT,                                           -- Optional notes related to the appointment.
    status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',  -- Status of the appointment (scheduled, completed, cancelled).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- Timestamp of when the appointment was created.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Foreign key referencing the users table. Deletes appointments if the user is deleted.
);

-- Carbon footprints table
CREATE TABLE carbon_footprints (
    id INT AUTO_INCREMENT PRIMARY KEY,                   -- Unique identifier for each carbon footprint record.
    user_id INT NOT NULL,                                 -- The user who this carbon footprint belongs to (foreign key reference).
    total_footprint DECIMAL(10, 2) NOT NULL,              -- Total carbon footprint in tons of CO2.
    electricity DECIMAL(10, 2) NOT NULL,                  -- Carbon footprint from electricity consumption.
    gas DECIMAL(10, 2) NOT NULL,                          -- Carbon footprint from gas usage.
    vehicle DECIMAL(10, 2) NOT NULL,                      -- Carbon footprint from vehicle usage.
    flights DECIMAL(10, 2) NOT NULL,                      -- Carbon footprint from flights.
    diet DECIMAL(10, 2) NOT NULL,                         -- Carbon footprint from diet.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- Timestamp of when the carbon footprint record was created.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Foreign key referencing the users table. Deletes footprints if the user is deleted.
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,                   -- Unique identifier for each product.
    name VARCHAR(255) NOT NULL,                           -- Product name (required).
    category ENUM('solar', 'ev', 'smart') NOT NULL,       -- Category of the product (solar, electric vehicle, or smart).
    description TEXT NOT NULL,                            -- Detailed description of the product (required).
    features TEXT NOT NULL,                               -- List of features of the product (required).
    image_path VARCHAR(255),                              -- Path to the product image (optional).
    price VARCHAR(100) NOT NULL,                          -- Price of the product (required).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP        -- Timestamp of when the product was created.
);
