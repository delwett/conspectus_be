import { GraphQLObjectType } from 'graphql'
import type { Source, Context } from '../types'
import login from './login'
import logout from './logout'
import newUser from './new-user'

export default new GraphQLObjectType<Source, Context>({
  name: 'Mutation',
  fields: {
    login,
    logout,
    newUser
  }
})
