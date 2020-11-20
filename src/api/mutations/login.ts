import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import type { Source, Context } from '../types'

const LoginPayload = new GraphQLObjectType<Source, Context>({
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
    return {
      token: '12321312'
    }
  }
}

export default login
