import { GraphQLObjectType } from 'graphql'

import login from './login'
import logout from './logout'

import createUser from './create-user'
import updateUser from './update-user'
import updatePassword from './update-password'

import createTask from './create-task'
import deleteTask from './delete-task'
import updateTaskStatus from './update-task-status'
import updateTaskDescription from './update-task-description'
import updateTaskParent from './update-task-parent'

import createComment from './create-comment'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login,
    logout,
    createUser,
    updateUser,
    updatePassword,
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTaskDescription,
    updateTaskParent,
    createComment
  }
})
