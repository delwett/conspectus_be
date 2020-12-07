import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) }
  }
})

export default UserType
