import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import UserType from '@/api/definitions/user-type'
import handleErrors from '@/api/utils/handle-errors'
import UserService from '@/services/users'
import type { Source, Context } from '../types'

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

const newUser: GraphQLFieldConfig<Source, Context> = {
  type: NewUserPayload,
  args: {
    newUserInput: { type: NewUserInput }
  },
  resolve: async (_, args) => {
    const { firstName, lastName, email, password } = (args as InputType).newUserInput
    return handleErrors(async () => {
      const user = await UserService.createUser({ firstName, lastName, email, password })

      return { user }
    })
  }
}

export default newUser
