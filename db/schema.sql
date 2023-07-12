-- Create the statereview_db database
CREATE DATABASE statereview_db;

-- Use the statereview_db database
USE statereview_db;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the states table
CREATE TABLE states (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  population INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the reviews table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state_id INT,
  user_id INT,
  rating FLOAT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
