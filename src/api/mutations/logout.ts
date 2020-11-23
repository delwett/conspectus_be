import { GraphQLFieldConfig } from 'graphql'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import handleErrors from '@/api/utils/handle-errors'
import AuthService from '@/services/auth'
import type { Source, Context } from '../types'

const LogoutPayload = new GraphQLObjectWithErrorType({
  name: 'LogoutPayload'
})

const logout: GraphQLFieldConfig<Source, Context> = {
  type: LogoutPayload,
  resolve: async (_, __, context) => {
    const authToken = context.authToken

    return handleErrors(async () => {
      if (!authToken) return

      await AuthService.logout(authToken)
    })
  }
}

export default logout
