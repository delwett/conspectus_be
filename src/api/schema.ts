import { GraphQLSchema } from 'graphql'
import QueryRootObject from './queries'
import MutationRootObject from './mutations'

export default new GraphQLSchema({
  query: QueryRootObject,
  mutation: MutationRootObject
})
