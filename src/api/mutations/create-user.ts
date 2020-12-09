import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'

type InputType = {
  createUserInput: {
    firstName: string
    lastName?: string
    email: string
    password: string
  }
}

const CreateUserResponseType = new GraphQLObjectWithErrorType({
  name: 'CreateUserResponseType',
  fields: {
    user: { type: UserType }
  }
})

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
  type: CreateUserResponseType,
  args: {
    createUserInput: { type: CreateUserInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { firstName, lastName, email, password } = (args as InputType).createUserInput
      const user = await UserService.createUser({ firstName, lastName, email, password })

      return { user }
    })
  }
}

export default createUser
