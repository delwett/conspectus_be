import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import type { Board } from '@/entities/board'
import TasksService from '@/services/tasks'

const BoardType = new GraphQLObjectType<Board, Context>({
  name: 'Board',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    meetingDate: { type: GraphQLNonNull(GraphQLDate) },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async board => TasksService.getRootTasks(board.id)
    }
  }
})

export default BoardType
