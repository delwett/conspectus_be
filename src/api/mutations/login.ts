import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { AuthTokenScalar } from '@/api/definitions'
import type { Context } from '@/api/types'
import AuthService from '@/services/auth'

type InputType = {
  loginInput: {
    email: string
    password: string
  }
}

const LoginInput = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
})

const login: GraphQLFieldConfig<undefined, Context> = {
  type: AuthTokenScalar,
  args: {
    loginInput: { type: LoginInput }
  },
  resolve: async (_, args) => {
    const { email, password } = (args as InputType).loginInput

    return AuthService.login({ email, password })
  }
}

export default login
