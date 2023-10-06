import { User } from '../database/models/index';

export const findUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
});
export const findUserById = async (id) => User.findOne({
  where: {
    id,
  },
});
export const createUser = async (user) => User.create(user);
export const updateUser = async (id, user) => User.update(user, {
  where: {
    id,
  },
});
