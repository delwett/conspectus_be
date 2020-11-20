import { GraphQLSchema } from 'graphql'
import QueryObject from './queries'

export default new GraphQLSchema({
  query: QueryObject
})
