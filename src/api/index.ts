import type { RequestHandler } from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from '@/api/schema'
import handleError from '@/api/utils/handle-error'
import type { Context } from '@/api/types'
import AuthService from '@/services/auth'
import UsersService from '@/services/users'

const graphqlMiddleware: RequestHandler = async (req, res) => {
  const authToken = typeof req.headers.auth === 'string' ? req.headers.auth : undefined
  const parsedToken = authToken ? await AuthService.decodeToken(authToken).catch(() => undefined) : undefined

  const currentUser = parsedToken ? await UsersService.getUserById(parsedToken.id).catch(() => undefined) : undefined

  const context: Context = {
    currentUser,
    authToken,
    dataLoaders: new WeakMap()
  }

  return await graphqlHTTP({
    schema,
    context,
    customFormatErrorFn: handleError
  })(req, res)
}

export default graphqlMiddleware
