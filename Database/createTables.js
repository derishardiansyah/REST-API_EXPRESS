import conn from "../Config/config.js";

const createTables = () => {
  conn.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Connected");
    }
  });

  // Membuat tabel user
  conn.query(
    `CREATE TABLE IF NOT EXISTS user (
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(password) >= 8),
    profile_image VARCHAR(255)
  )`,
    (err, result) => {
      if (err) {
        console.error("Error creating user table:", err);
        return;
      }
      console.log("User table created successfully");
    }
  );

  // Membuat tabel banner
  conn.query(
    `CREATE TABLE IF NOT EXISTS banner (
    banner_name VARCHAR(50) PRIMARY KEY,
    banner_image VARCHAR(255),
    description TEXT
  )`,
    (err, result) => {
      if (err) {
        console.error("Error creating banner table:", err);
        return;
      }
      console.log("Banner table created successfully");
    }
  );

  // Membuat tabel service
  conn.query(
    `CREATE TABLE IF NOT EXISTS service (
    service_code VARCHAR(10) PRIMARY KEY,
    service_name VARCHAR(100),
    service_icon VARCHAR(255),
    service_tarif DECIMAL(10, 2)
  )`,
    (err, result) => {
      if (err) {
        console.error("Error creating service table:", err);
        return;
      }
      console.log("Service table created successfully");
    }
  );

  // Membuat tabel amount
  conn.query(
    `CREATE TABLE IF NOT EXISTS amount (
    transaction_type ENUM('top_up', 'payment') NOT NULL,
    top_up_amount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    invoice_number VARCHAR(20) PRIMARY KEY
  )`,
    (err, result) => {
      if (err) {
        console.error("Error creating amount table:", err);
        return;
      }
      console.log("Amount table created successfully");
    }
  );

  // Menutup koneksi setelah membuat tabel-tabel
  conn.end();
};

export default createTables;
