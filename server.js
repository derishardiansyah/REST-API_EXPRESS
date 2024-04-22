import express from "express";

import userRouter from "./Routes/userRoute.js";
import docRouter from "./Routes/docRoute.js";
import connectDatabase from "./Config/connectDatabase.js";

const port = process.env.DB_PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();
app.use("/", docRouter);
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
