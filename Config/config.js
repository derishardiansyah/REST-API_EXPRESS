import mysql from "mysql";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // socketPath: process.env.DB_SOCKET,
  port: process.env.DB_PORT,
});

export default conn;

// conn.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Database Connected");
//   }
// });
