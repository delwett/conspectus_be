import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'

type InputType = {
  newUserInput: {
    firstName: string
    lastName?: string
    email: string
    password: string
  }
}

const NewUserPayload = new GraphQLObjectWithErrorType({
  name: 'NewUserPayload',
  fields: {
    user: { type: UserType }
  }
})

const NewUserInput = new GraphQLInputObjectType({
  name: 'NewUserInput',
  fields: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
})

const newUser: GraphQLFieldConfig<undefined, Context> = {
  type: NewUserPayload,
  args: {
    newUserInput: { type: NewUserInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { firstName, lastName, email, password } = (args as InputType).newUserInput
    return handleErrors(async () => {
      const user = await UserService.createUser({ firstName, lastName, email, password })

      return { user }
    })
  }
}

export default newUser
