-- Table Clients
CREATE TABLE Clients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
);

-- Table Appointments
CREATE TABLE Appointments (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL REFERENCES Clients(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    preferred_notification VARCHAR(20) CHECK (preferred_notification IN ('email', 'sms', 'both')),
    optician_notes TEXT
);

-- Table BlockedSlots
CREATE TABLE BlockedSlots (
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

-- Table Notifications
CREATE TABLE Notifications (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
    notification_date TIMESTAMP NOT NULL,
    type VARCHAR(20) CHECK (type IN ('rappel', 'confirmation', 'modification'))
);

-- Table ContactMessages
CREATE TABLE ContactMessages (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message_content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_appointment_date ON Appointments(appointment_date);
CREATE INDEX idx_start_date ON BlockedSlots(start_date);