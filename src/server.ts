import express from 'express';
import { graphqlHTTP } from 'express-graphql';
// Required for TypeORM
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import schema from './api/schema';
import { stage } from './config';

dotenv.config();

const IS_DEVELOPMENT = stage !== 'production';
const PORT = process.env.PORT ?? 8000;

createConnection()
  .then(async () => {
    const app = express();

    app.use(
      '/graphql',
      graphqlHTTP({
        schema: schema,
        graphiql: IS_DEVELOPMENT
      })
    );

    app.listen(PORT, () => {
      console.log(`GraphQL server started at http://localhost:${PORT}/graphgql`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
