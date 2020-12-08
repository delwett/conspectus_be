import { GraphQLFieldConfig, GraphQLList } from 'graphql'
import { getManager } from 'typeorm'
import handleErrors from '@/api/utils/handle-errors'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import { User } from '@/entities/user'

const CollectionType = new GraphQLObjectWithErrorType({
  name: 'UsersCollection',
  fields: {
    collection: { type: new GraphQLList(UserType) }
  }
})

const usersList: GraphQLFieldConfig<undefined, Context> = {
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
