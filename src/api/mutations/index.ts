import { GraphQLObjectType } from 'graphql'
import type { Source, Context } from '../types'
import login from './login'

export default new GraphQLObjectType<Source, Context>({
  name: 'Mutation',
  fields: {
    login
  }
})
