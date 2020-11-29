import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import UserType from '@/api/definitions/user-type'
import handleErrors from '@/api/utils/handle-errors'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'
import type { Source, Context } from '../types'

type InputType = {
  updateUserInput: {
    id: string
    firstName: string
    lastName?: string
    email: string
  }
}

const UpdateUserPayload = new GraphQLObjectWithErrorType({
  name: 'UpdateUserPayload',
  fields: {
    user: { type: UserType }
  }
})

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) }
  }
})

const newUser: GraphQLFieldConfig<Source, Context> = {
  type: UpdateUserPayload,
  args: {
    updateUserInput: { type: UpdateUserInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { id, firstName, lastName, email } = (args as InputType).updateUserInput

      const user = await UserService.updateUser({ id, firstName, lastName, email })

      return { user }
    })
  }
}

export default newUser
