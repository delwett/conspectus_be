import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import handleErrors from '@/api/utils/handle-errors'
import AuthService from '@/services/auth'
import type { Source, Context } from '../types'

const LoginPayload = new GraphQLObjectWithErrorType<Source, Context>({
  name: 'loginPayload',
  fields: {
    token: { type: GraphQLString }
  }
})

const LoginInput = new GraphQLInputObjectType({
  name: 'loginInput',
  fields: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
})

const login: GraphQLFieldConfig<Source, Context> = {
  type: LoginPayload,
  args: {
    credentials: { type: LoginInput }
  },
  resolve: async (_, args) => {
    const { email, password } = args.credentials

    return handleErrors(async () => {
      const token = await AuthService.login({ email, password })
      return { token }
    })
  }
}

export default login
