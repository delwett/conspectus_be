import express from 'express'
import cors from 'cors'
// Required for TypeORM
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { json as jsonBodyParserMiddleware } from 'body-parser'
import gqlPlayground from 'graphql-playground-middleware-express'
import graphqlMiddleware from '@/api'
import { Stage, Port, ApiPath, ApiPlaygroundPath, Host } from '@/config'

const IsDevelopment = Stage !== 'production'

createConnection()
  .then(async () => {
    const app = express()

    app.use(cors())

    app.use(jsonBodyParserMiddleware())

    app.use(ApiPath, graphqlMiddleware)

    if (IsDevelopment) app.get(ApiPlaygroundPath, gqlPlayground({ endpoint: ApiPath }))

    app.listen(Port, Host)

    console.log(`GraphQL server started at http://${Host}:${Port}${ApiPath}`)
  })
  .catch(error => console.error('TypeORM connection error: ', error))
