import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql'

export default class GraphQLObjectWithErrorType<TSource = any, TContext = any> extends GraphQLObjectType {
  constructor(config: Readonly<GraphQLObjectTypeConfig<TSource, TContext>>) {
    const fields = typeof config.fields === 'function' ? config.fields() : config.fields

    const ErrorType = new GraphQLObjectType<TSource, TContext>({
      name: 'error',
      fields: {
        code: { type: GraphQLNonNull(GraphQLInt) },
        message: { type: GraphQLNonNull(GraphQLString) }
      }
    })

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
