-- Create database and table if they don't exist
CREATE DATABASE IF NOT EXISTS freshora;
USE freshora;

-- Create the otp_codes table for storing OTP verification codes
CREATE TABLE IF NOT EXISTS otp_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mobile (mobile),
  INDEX idx_expires_at (expires_at)
);

-- Show table structure to verify creation
DESCRIBE otp_codes;

-- Show any existing data
SELECT COUNT(*) as total_otps FROM otp_codes;
