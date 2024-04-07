import conn from "../Config/config.js";

const createTable = () => {
  conn.query(
    `CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255)
  )`,
    (err, result) => {
      if (err) {
        console.error("Terjadi kesalahan saat membuat tabel jumlah:", err);
        return;
      }
      console.log("Tabel user berhasil dibuat");
    }
  );

  conn.query(
    `CREATE TABLE IF NOT EXISTS banner (
    banner_name VARCHAR(50) PRIMARY KEY,
    banner_image VARCHAR(255),
    description TEXT
  )`,
    (err, result) => {
      if (err) {
        console.error("Terjadi kesalahan saat membuat tabel jumlah:", err);
        return;
      }
      console.log("Tabel banner berhasil dibuat");
    }
  );

  conn.query(
    `CREATE TABLE IF NOT EXISTS service (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_code VARCHAR(10),
    service_name VARCHAR(100),
    service_icon VARCHAR(255),
    service_tarif INT        
  )`,
    (err, result) => {
      if (err) {
        console.error("Terjadi kesalahan saat membuat tabel jumlah:", err);

        return;
      }
      console.log("Tabel sarvice berhasil dibuat");
    }
  );

  conn.query(
    `CREATE TABLE IF NOT EXISTS transaction (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    service_id INT,
    transaction_type ENUM('top_up', 'payment') NOT NULL,
    top_up_amount INT,
    total_amount INT,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    invoice_number VARCHAR(20),
    balance INT,
    description VARCHAR(255)
  )`,
    (err, result) => {
      if (err) {
        console.error("Terjadi kesalahan saat membuat tabel jumlah:", err);
        return;
      }
      console.log("Tabel transaksi berhasil dibuat");
      // conn.end();
    }
  );
};

export default createTable;
