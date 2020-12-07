import { GraphQLFieldConfig, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import handleErrors from '@/api/utils/handle-errors'
import GraphQLObjectWithErrorType from '@/api/definitions/graphql-object-with-error-type'
import TaskType from '@/api/definitions/task-type'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'
import type { Source, Context } from '../types'

const BoardType = new GraphQLObjectType({
  name: 'Board',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    meetingDate: { type: GraphQLNonNull(GraphQLString) },
    tasks: { type: new GraphQLList(TaskType) }
  }
})

const CrrentBoardResponseType = new GraphQLObjectWithErrorType({
  name: 'CurentBoardResponse',
  fields: {
    curentBoard: { type: BoardType }
  }
})

const getBoard: GraphQLFieldConfig<Source, Context> = {
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
