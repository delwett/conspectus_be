import { GraphQLObjectType } from 'graphql'
import getCurrentUser from './get-current-user'
import getUsers from './get-users'
import getCurrentBoard from './get-current-board'

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    getCurrentUser,
    getUsers,
    getCurrentBoard
  }
})
