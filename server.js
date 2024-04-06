import express from "express";
import createTables from "./Database/createTables.js";

const port = process.env.DB_PORT || 6100;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  createTables();
});

export default app;
