import { User } from '../../entities/user';
import { getManager } from 'typeorm';
import { GraphQLList } from 'graphql';
import { userType } from '../types';

export default {
  type: new GraphQLList(userType),
  resolve: async () => {
    const entityManager = getManager();

    const a = await entityManager.find(User, { where: { id: '1' } });

    return a;
  }
};
