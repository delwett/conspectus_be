import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'

type InputType = {
  updateUserInput: {
    firstName: string
    lastName?: string
    email: string
  }
}

const UpdateUserResponseType = new GraphQLObjectWithErrorType({
  name: 'UpdateUserResponseType',
  fields: {
    user: { type: UserType }
  }
})

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) }
  }
})

const newUser: GraphQLFieldConfig<undefined, Context> = {
  type: UpdateUserResponseType,
  args: {
    updateUserInput: { type: UpdateUserInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { firstName, lastName, email } = (args as InputType).updateUserInput

      const user = await UserService.updateUser({ id: context.currentUser.id, firstName, lastName, email })

      return { user }
    })
  }
}

export default newUser
