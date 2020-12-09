import { GraphQLFieldConfig } from 'graphql'
import { UserType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'

const getCurrentUser: GraphQLFieldConfig<undefined, Context> = {
  type: UserType,
  resolve: async (_, __, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    return context.currentUser
  }
}

export default getCurrentUser
