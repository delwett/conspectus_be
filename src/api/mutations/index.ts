import { GraphQLObjectType } from 'graphql'

import login from './login'
import logout from './logout'

import createUser from './create-user'
import deleteUser from './delete-user'
import updateUser from './update-user'
import updatePassword from './update-password'

import completeMeeting from './complete-meeting'
import updateMeetingDate from './update-meeting-date'

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
    deleteUser,
    updateUser,
    updatePassword,
    completeMeeting,
    updateMeetingDate,
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTaskDescription,
    updateTaskParent,
    createComment
  }
})
