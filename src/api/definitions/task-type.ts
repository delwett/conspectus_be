import { FieldNode, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import DataLoader from 'dataloader'
import { TaskStatusEnum } from '@/api/definitions'
import type { Context, DataLoaderWeakMap } from '@/api/types'
import { Task } from '@/entities/task'
import TasksService from '@/services/tasks'

type SubtasksLoader = DataLoader<string, Task[]>

function getSubtasksLoader(dataLoaders: DataLoaderWeakMap<SubtasksLoader>, key: readonly FieldNode[]): SubtasksLoader {
  let subtasksLoader = dataLoaders.get(key)

  if (!subtasksLoader) {
    subtasksLoader = new DataLoader(async (ids: readonly string[]) => {
      const tasks = await TasksService.getSubtasks([...ids])

      return ids.map(id => tasks.filter(task => task.parentId === id))
    })

    dataLoaders.set(key, subtasksLoader)
  }

  return subtasksLoader
}

const TaskType = new GraphQLObjectType<Task, Context>({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLNonNull(GraphQLString) },
    subtasks: {
      type: new GraphQLList(TaskType),
      resolve: async (task, _, context, info) => {
        const subtasksLoader = getSubtasksLoader(context.dataLoaders, info.fieldNodes)

        return subtasksLoader.load(task.id)
      }
    },
    status: { type: TaskStatusEnum }
  })
})

export default TaskType
