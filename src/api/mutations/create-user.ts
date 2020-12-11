import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { UserType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'

type InputType = {
  createUserInput: {
    firstName: string
    lastName?: string | null
    email: string
    password: string
  }
}

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
})

const createUser: GraphQLFieldConfig<undefined, Context> = {
  type: UserType,
  args: {
    createUserInput: { type: CreateUserInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { firstName, lastName, email, password } = (args as InputType).createUserInput

    return UserService.createUser({ firstName, lastName, email, password })
  }
}

export default createUser
