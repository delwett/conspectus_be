import { GraphQLObjectType } from 'graphql'
import usersList from './users-list'
import getCurrentBoard from './get-current-board'

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    usersList,
    getCurrentBoard
  }
})
