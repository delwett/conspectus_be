import { FieldNode, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import DataLoader from 'dataloader'
import { TaskStatusEnum, CommentType } from '@/api/definitions'
import type { Context, DataLoaderWeakMap } from '@/api/types'
import { Task } from '@/entities/task'
import { Comment } from '@/entities/comment'
import TasksService from '@/services/tasks'
import CommentsService from '@/services/comments'

type SubtasksLoader = DataLoader<string, Task[]>
type CommentsLoader = DataLoader<string, Comment[]>

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

function getCommentsLoader(dataLoaders: DataLoaderWeakMap<CommentsLoader>, key: readonly FieldNode[]): CommentsLoader {
  let commentsLoader = dataLoaders.get(key)

  if (!commentsLoader) {
    commentsLoader = new DataLoader(async (ids: readonly string[]) => {
      const comments = await CommentsService.getCommentsByTaskIds([...ids])

      return ids.map(id => comments.filter(comment => comment.taskId === id))
    })

    dataLoaders.set(key, commentsLoader)
  }

  return commentsLoader
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
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (task, _, context, info) => {
        const commentsLoader = getCommentsLoader(context.dataLoaders, info.fieldNodes)

        return commentsLoader.load(task.id)
      }
    },
    status: { type: TaskStatusEnum }
  })
})

export default TaskType
