import express from "express";
import createTable from "./Models/createTable.js";
import userRouter from "./Routes/userRoute.js";

const port = process.env.DB_PORT || 6100;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createTable();
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
