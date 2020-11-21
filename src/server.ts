import express from 'express'
import { json as jsonBodyParserMiddleware } from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import gqlPlayground from 'graphql-playground-middleware-express'
// Required for TypeORM
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import schema from '@/api/schema'
import AuthService from '@/services/auth'
import { Stage } from '@/config'

const IsDevelopment = Stage !== 'production'
const Port = process.env.PORT ?? 8000

createConnection()
  .then(async () => {
    const app = express()

    app.use(jsonBodyParserMiddleware())

    app.use('/graphql', async (req, res) => {
      const authToken = typeof req.headers.auth === 'string' ? req.headers.auth : ''
      const parsedToken = AuthService.parseToken(authToken)

      return await graphqlHTTP({
        schema,
        context: {
          currentUser: parsedToken
        }
      })(req, res)
    })

    if (IsDevelopment) app.get('/playground', gqlPlayground({ endpoint: '/graphql' }))

    app.listen(Port)
  })
  .catch(error => console.error('TypeORM connection error: ', error))

console.log(`GraphQL server started at http://localhost:${Port}/graphgql`)
