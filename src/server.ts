import express from 'express'
import { graphqlHTTP } from 'express-graphql'
// Required for TypeORM
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
import schema from '@/api/schema'
import { stage } from '@/config'

dotenv.config()

const IsDevelopment = stage !== 'production'
const Port = process.env.PORT ?? 8000

createConnection()
  .then(async () => {
    const app = express()

    app.use(
      '/graphql',
      graphqlHTTP({
        schema: schema,
        graphiql: IsDevelopment
      })
    )

    app.listen(Port, () => {
      console.log(`GraphQL server started at http://localhost:${Port}/graphgql`)
    })
  })
  .catch(error => console.log('TypeORM connection error: ', error))
