import express from "express";

const port = process.env.DB_PORT || 6000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
