import { GraphQLObjectType } from 'graphql'
import type { Source, Context } from '../types'
import login from './login'
import logout from './logout'

export default new GraphQLObjectType<Source, Context>({
  name: 'Mutation',
  fields: {
    login,
    logout
  }
})
