import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql'
import type { Source, Context } from '../types'

const ErrorType = new GraphQLObjectType<Source, Context>({
  name: 'Error',
  fields: {
    code: { type: GraphQLNonNull(GraphQLInt) },
    message: { type: GraphQLNonNull(GraphQLString) }
  }
})

export default class GraphQLObjectWithErrorType extends GraphQLObjectType {
  constructor(config: Readonly<GraphQLObjectTypeConfig<Source, Context>>) {
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
