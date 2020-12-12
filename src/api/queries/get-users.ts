import { GraphQLFieldConfig, GraphQLList } from 'graphql'
import { UserType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UsersService from '@/services/users'

const getUsers: GraphQLFieldConfig<undefined, Context> = {
  type: new GraphQLList(UserType),
  resolve: async (_, __, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    return UsersService.getActiveUsers()
  }
}

export default getUsers
