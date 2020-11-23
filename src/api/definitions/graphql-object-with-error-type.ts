import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLString,
  Thunk
} from 'graphql'
import type { Source, Context } from '../types'

type ObjectConfig = Omit<GraphQLObjectTypeConfig<Source, Context>, 'fields'> & {
  fields?: Thunk<GraphQLFieldConfigMap<Source, Context>>
}

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: {
    code: { type: GraphQLNonNull(GraphQLInt) },
    message: { type: GraphQLNonNull(GraphQLString) }
  }
})

export default class GraphQLObjectWithErrorType extends GraphQLObjectType {
  constructor(config: Readonly<ObjectConfig>) {
    const fields = typeof config.fields === 'function' ? config.fields() : config.fields

    const extendedConfig = {
      ...config,
      fields: {
        ...fields,
        error: {
          type: ErrorType
        }
      }
    }
    super(extendedConfig)
  }
}
