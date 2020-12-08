import { GraphQLFieldConfig, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import handleErrors from '@/api/utils/handle-errors'
import { GraphQLObjectWithErrorType, TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'
import TasksService from '@/services/tasks'
import type { Board } from '@/entities/board'

const BoardType = new GraphQLObjectType<Board, Context>({
  name: 'Board',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    meetingDate: { type: GraphQLNonNull(GraphQLString) },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async board => TasksService.getRootTasks(board.id)
    }
  }
})

const CrrentBoardResponseType = new GraphQLObjectWithErrorType({
  name: 'CurentBoardResponse',
  fields: {
    curentBoard: { type: BoardType }
  }
})

const getBoard: GraphQLFieldConfig<undefined, Context> = {
  type: CrrentBoardResponseType,
  resolve: async (_, __, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const curentBoard = await BoardsService.getCurrentBoard()

      return { curentBoard }
    })
  }
}

export default getBoard
