import { GraphQLBoolean, GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import UsersService from '@/services/users'

type InputType = {
  deleteUserInput: {
    id: string
  }
}

const DeleteUserInput = new GraphQLInputObjectType({
  name: 'DeleteUserInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) }
  }
})

const deleteUser: GraphQLFieldConfig<undefined, Context> = {
  type: GraphQLBoolean,
  args: {
    deleteUserInput: { type: DeleteUserInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id } = (args as InputType).deleteUserInput

    return UsersService.deleteUser(id)
  }
}

export default deleteUser
