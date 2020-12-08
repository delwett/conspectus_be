import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'

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

const newUser: GraphQLFieldConfig<undefined, Context> = {
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
