import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType } from '@/api/definitions'
import type { Context } from '@/api/types'
import handleErrors from '@/api/utils/handle-errors'
import AuthService from '@/services/auth'

const LoginPayload = new GraphQLObjectWithErrorType({
  name: 'LoginPayload',
  fields: {
    token: { type: GraphQLString }
  }
})

const LoginInput = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
})

const login: GraphQLFieldConfig<undefined, Context> = {
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
