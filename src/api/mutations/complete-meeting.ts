import { GraphQLFieldConfig, GraphQLBoolean } from 'graphql'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'

const completeMeeting: GraphQLFieldConfig<undefined, Context> = {
  type: GraphQLBoolean,
  resolve: async (_, __, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    return BoardsService.completeMeeting()
  }
}

export default completeMeeting
