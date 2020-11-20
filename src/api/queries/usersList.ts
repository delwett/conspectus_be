import { GraphQLList } from 'graphql'
import { getManager } from 'typeorm'
import { User } from '@/entities/user'
import { userType } from '../types'

export default {
  type: new GraphQLList(userType),
  resolve: async () => {
    const entityManager = getManager()

    const a = await entityManager.find(User, { where: { id: '1' } })

    return a
  }
}
