import { GraphQLFieldConfig as GraphQLFieldConfigBase } from 'graphql'
import { User } from '@/entities/user'

export type Source = undefined

export type Context = {
  currentUser?: User
  authToken?: string
}

export type GraphQLFieldConfig = GraphQLFieldConfigBase<Source, Context>
