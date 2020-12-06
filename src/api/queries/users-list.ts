import { GraphQLFieldConfig, GraphQLList } from 'graphql'
import { getManager } from 'typeorm'
import handleErrors from '@/api/utils/handle-errors'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import UserType from '@/api/definitions/user-type'
import NotAuthorizedError from '@/errors/not-authorized-error'
import { User } from '@/entities/user'
import type { Source, Context } from '../types'

const CollectionType = new GraphQLObjectWithErrorType({
  name: 'UsersCollection',
  fields: {
    collection: { type: new GraphQLList(UserType) }
  }
})

const usersList: GraphQLFieldConfig<Source, Context> = {
  type: CollectionType,
  resolve: async (_, __, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const entityManager = getManager()
      const collection = await entityManager.find(User)

      return { collection }
    })
  }
}

export default usersList
