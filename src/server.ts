import express from "express";
import { createConnection } from "typeorm";
// Required for TypeORM
import "reflect-metadata";
import dotenv from "dotenv";
import { User } from "./entities/user";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8000;

createConnection()
  .then(async c => await c.manager.find(User, { where: { id: "1" } }))
  .catch(e => console.error(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
