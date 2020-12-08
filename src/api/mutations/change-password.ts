import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import UserService from '@/services/users'
import AuthService from '@/services/auth'
import NotAuthorizedError from '@/errors/not-authorized-error'

type InputType = {
  changePasswordInput: {
    oldPassword: string
    newPassword: string
  }
}

const ChangePasswordPayload = new GraphQLObjectWithErrorType({
  name: 'ChangePasswordPayload',
  fields: {
    token: { type: GraphQLString }
  }
})

const ChangePasswordInput = new GraphQLInputObjectType({
  name: 'ChangePasswordInput',
  fields: {
    oldPassword: { type: GraphQLNonNull(GraphQLString) },
    newPassword: { type: GraphQLNonNull(GraphQLString) }
  }
})

const changePassword: GraphQLFieldConfig<undefined, Context> = {
  type: ChangePasswordPayload,
  args: {
    changePasswordInput: { type: ChangePasswordInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { oldPassword, newPassword } = (args as InputType).changePasswordInput
      const id = context.currentUser.id

      await UserService.updatePassword({ id, oldPassword, newPassword })
      await AuthService.invalidateTokens(id)
      const token = AuthService.login({ email: context.currentUser.email, password: newPassword })

      return { token }
    })
  }
}

export default changePassword
