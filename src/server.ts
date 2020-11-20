import express from 'express'
import { json as jsonBodyParserMiddleware } from 'body-parser'
import jwtEncodeMiddleware from 'express-jwt'
import { graphqlHTTP } from 'express-graphql'
import gqlPlayground from 'graphql-playground-middleware-express'
// Required for TypeORM
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import schema from '@/api/schema'
import { Stage, JwtSecret } from '@/config'

const IsDevelopment = Stage !== 'production'
const Port = process.env.PORT ?? 8000

createConnection()
  .then(async () => {
    const app = express()

    app.use(jsonBodyParserMiddleware())

    app.use(
      jwtEncodeMiddleware({
        secret: JwtSecret,
        algorithms: ['RS256'],
        credentialsRequired: false
      })
    )

    app.use('/graphql', async (req, res) => {
      return await graphqlHTTP({ schema })(req, res)
    })

    if (IsDevelopment) app.get('/playground', gqlPlayground({ endpoint: '/graphql' }))

    app.listen(Port, () => {
      console.log(`GraphQL server started at http://localhost:${Port}/graphgql`)
    })
  })
  .catch(error => console.error('TypeORM connection error: ', error))
