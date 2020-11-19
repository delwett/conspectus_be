import express from "express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
// Required for TypeORM
import "reflect-metadata";
import dotenv from "dotenv";
import { User } from "./entities/user";
import { stage } from "./config";

dotenv.config();

const IS_DEVELOPMENT = stage !== "production";
const PORT = process.env.PORT ?? 8000;

const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return "Hello world!";
  }
};

createConnection()
  .then(async c => await c.manager.find(User, { where: { id: "1" } }))
  .catch(e => console.error(e));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: IS_DEVELOPMENT
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL server started at http://localhost:${PORT}/graphgql`);
});
