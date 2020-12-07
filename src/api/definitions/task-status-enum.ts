import { GraphQLEnumType } from 'graphql'

const TaskStatusEnum = new GraphQLEnumType({
  name: 'TaskStatusEnum',
  values: {
    IN_PROGRESS: { value: 'IN_PROGRESS' },
    COMPLETED: { value: 'COMPLETED' }
  }
})

export default TaskStatusEnum
