import { GraphQLObjectType } from 'graphql'
import login from './login'
import logout from './logout'
import newUser from './new-user'
import updateUser from './update-user'
import changePassword from './change-password'
import addTask from './add-task'
import createComment from './create-comment'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login,
    logout,
    newUser,
    updateUser,
    changePassword,
    addTask,
    createComment
  }
})
