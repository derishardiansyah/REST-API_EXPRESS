import conn from "./config.js";

const connectDatabase = () => {
  conn.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Database connected successfully");
    }
  });
};

export default connectDatabase;
