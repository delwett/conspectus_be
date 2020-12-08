import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLString,
  Thunk
} from 'graphql'

type ObjectConfig<TSource, TContext> = Omit<GraphQLObjectTypeConfig<TSource, TContext>, 'fields'> & {
  fields?: Thunk<GraphQLFieldConfigMap<TSource, TContext>>
}

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: {
    code: { type: GraphQLNonNull(GraphQLInt) },
    message: { type: GraphQLNonNull(GraphQLString) }
  }
})

export default class GraphQLObjectWithErrorType<TSource = any, TContext = any> extends GraphQLObjectType {
  constructor(config: Readonly<ObjectConfig<TSource, TContext>>) {
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
