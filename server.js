import express from "express";
import createTable from "./Models/createTable.js";
import userRouter from "./Routes/userRoute.js";
import docRouter from "./Routes/docRoute.js";

const port = process.env.DB_PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// createTable();
// app.use("/", docRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
