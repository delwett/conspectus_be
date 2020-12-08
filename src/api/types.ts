import { FieldNode } from 'graphql'
import DataLoader from 'dataloader'
import { User } from '@/entities/user'

type AbstractLoader = DataLoader<any, any>

export type DataLoaderWeakMap<Loader extends AbstractLoader> = WeakMap<readonly FieldNode[], Loader>

export type Context<Loader extends AbstractLoader = AbstractLoader> = {
  currentUser?: User
  authToken?: string
  dataLoaders: DataLoaderWeakMap<Loader>
}
