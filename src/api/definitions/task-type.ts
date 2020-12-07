import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import TaskStatusEnum from './task-status-enum'

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLNonNull(GraphQLString) },
    subtasks: { type: new GraphQLList(TaskType) },
    status: { type: TaskStatusEnum }
  })
})

export default TaskType
