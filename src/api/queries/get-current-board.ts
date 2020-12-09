import { GraphQLFieldConfig } from 'graphql'
import handleErrors from '@/api/utils/handle-errors'
import { GraphQLObjectWithErrorType, BoardType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'

const CurrentBoardResponseType = new GraphQLObjectWithErrorType({
  name: 'CurentBoardResponse',
  fields: {
    currentBoard: { type: BoardType }
  }
})

const getBoard: GraphQLFieldConfig<undefined, Context> = {
  type: CurrentBoardResponseType,
  resolve: async (_, __, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const currentBoard = await BoardsService.getCurrentBoard()

      return { currentBoard }
    })
  }
}

export default getBoard
