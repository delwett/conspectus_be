import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { UserType } from '@/api/definitions'
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

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) }
  }
})

const newUser: GraphQLFieldConfig<undefined, Context> = {
  type: UserType,
  args: {
    updateUserInput: { type: UpdateUserInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { firstName, lastName, email } = (args as InputType).updateUserInput

    return UserService.updateUser({ id: context.currentUser.id, firstName, lastName, email })
  }
}

export default newUser
