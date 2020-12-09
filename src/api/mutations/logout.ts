import { GraphQLFieldConfig, GraphQLBoolean } from 'graphql'
import type { Context } from '@/api/types'
import AuthService from '@/services/auth'

const logout: GraphQLFieldConfig<undefined, Context> = {
  type: GraphQLBoolean,
  resolve: async (_, __, context) => {
    const { currentUser, authToken } = context
    const currentUserId = currentUser?.id

    if (!authToken || !currentUserId) return false

    await AuthService.logout({ id: currentUserId, token: authToken }).catch(() => false)

    return true
  }
}

export default logout
