import { GraphQLFieldConfig } from 'graphql'
import { BoardType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'

const getBoard: GraphQLFieldConfig<undefined, Context> = {
  type: BoardType,
  resolve: async (_, __, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    return BoardsService.getCurrentBoard()
  }
}

export default getBoard
