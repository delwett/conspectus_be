import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import { getManager } from 'typeorm'
import { User } from '@/entities/user'
import type { Source, Context } from '../types'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString }
  }
})

const usersList: GraphQLFieldConfig<Source, Context> = {
  type: new GraphQLList(UserType),
  resolve: async (_, __, ctx) => {
    console.log('!!!!!!!!!!!', ctx)
    const entityManager = getManager()
    return (await entityManager.find(User, { where: { id: '1' } })) ?? []
  }
}

export default usersList
