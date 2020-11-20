import { GraphQLObjectType } from 'graphql';
import usersList from './usersList';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    usersList
  })
});
