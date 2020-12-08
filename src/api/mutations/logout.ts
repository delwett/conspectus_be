import { GraphQLFieldConfig } from 'graphql'
import { GraphQLObjectWithErrorType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import AuthService from '@/services/auth'

const LogoutPayload = new GraphQLObjectWithErrorType({
  name: 'LogoutPayload'
})

const logout: GraphQLFieldConfig<undefined, Context> = {
  type: LogoutPayload,
  resolve: async (_, __, context) => {
    const currentUserId = context.currentUser?.id
    const authToken = context.authToken

    return handleErrors(async () => {
      if (!authToken || !currentUserId) return

      await AuthService.logout({ id: currentUserId, token: authToken })
    })
  }
}

export default logout
