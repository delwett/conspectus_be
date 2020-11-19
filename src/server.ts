import express from "express";
import { createConnection } from "typeorm";
// For TypeORM
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8000;

createConnection()
  .then()
  .catch(e => console.error(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
