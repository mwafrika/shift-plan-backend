import { User } from '../../database/models/index';

export const findUserByEmail = async (email, options = {}) => User.findOne({
  where: {
    email,
  },
  ...options,
});
export const findUserById = async (id, options = {}) => User.findOne({
  where: {
    id,
  },
  ...options,
});
export const createUser = async (user) => User.create(user);
