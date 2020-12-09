import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { AuthTokenScalar } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UserService from '@/services/users'
import AuthService from '@/services/auth'

type InputType = {
  updatePasswordInput: {
    oldPassword: string
    newPassword: string
  }
}

const UpdatePasswordInput = new GraphQLInputObjectType({
  name: 'UpdatePasswordInput',
  fields: {
    oldPassword: { type: GraphQLNonNull(GraphQLString) },
    newPassword: { type: GraphQLNonNull(GraphQLString) }
  }
})

const updatePassword: GraphQLFieldConfig<undefined, Context> = {
  type: AuthTokenScalar,
  args: {
    updatePasswordInput: { type: UpdatePasswordInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { oldPassword, newPassword } = (args as InputType).updatePasswordInput
    const id = context.currentUser.id

    await UserService.updatePassword({ id, oldPassword, newPassword })
    await AuthService.invalidateTokens(id)

    return AuthService.login({ email: context.currentUser.email, password: newPassword })
  }
}

export default updatePassword
