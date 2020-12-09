import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import UserService from '@/services/users'
import AuthService from '@/services/auth'
import NotAuthorizedError from '@/errors/not-authorized-error'

type InputType = {
  updatePasswordInput: {
    oldPassword: string
    newPassword: string
  }
}

const UpdatePasswordResponseType = new GraphQLObjectWithErrorType({
  name: 'UpdatePasswordResponseType',
  fields: {
    token: { type: GraphQLString }
  }
})

const UpdatePasswordInput = new GraphQLInputObjectType({
  name: 'UpdatePasswordInput',
  fields: {
    oldPassword: { type: GraphQLNonNull(GraphQLString) },
    newPassword: { type: GraphQLNonNull(GraphQLString) }
  }
})

const updatePassword: GraphQLFieldConfig<undefined, Context> = {
  type: UpdatePasswordResponseType,
  args: {
    updatePasswordInput: { type: UpdatePasswordInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { oldPassword, newPassword } = (args as InputType).updatePasswordInput
      const id = context.currentUser.id

      await UserService.updatePassword({ id, oldPassword, newPassword })
      await AuthService.invalidateTokens(id)
      const token = AuthService.login({ email: context.currentUser.email, password: newPassword })

      return { token }
    })
  }
}

export default updatePassword
