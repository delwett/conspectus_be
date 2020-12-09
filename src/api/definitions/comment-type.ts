import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) }
  }
})

export default CommentType
