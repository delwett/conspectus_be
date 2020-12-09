import { GraphQLObjectType } from 'graphql'
import getCurrentUser from './get-current-user'
import getCurrentBoard from './get-current-board'

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    getCurrentUser,
    getCurrentBoard
  }
})
