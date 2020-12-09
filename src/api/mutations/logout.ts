import { GraphQLFieldConfig } from 'graphql'
import { GraphQLObjectWithErrorType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import AuthService from '@/services/auth'

const LogoutResponseType = new GraphQLObjectWithErrorType({
  name: 'LogoutResponseType'
})

const logout: GraphQLFieldConfig<undefined, Context> = {
  type: LogoutResponseType,
  resolve: async (_, __, context) => {
    return handleErrors(async () => {
      const { currentUser, authToken } = context
      const currentUserId = currentUser?.id

      if (!authToken || !currentUserId) return

      await AuthService.logout({ id: currentUserId, token: authToken })
    })
  }
}

export default logout
