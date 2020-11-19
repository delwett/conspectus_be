import express from "express";

// For TypeORM
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
