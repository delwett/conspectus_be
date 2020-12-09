import { GraphQLObjectType } from 'graphql'
import login from './login'
import logout from './logout'
import createUser from './create-user'
import updateUser from './update-user'
import updatePassword from './update-password'
import createTask from './create-task'
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
    createComment
  }
})
