import { User } from "../../database/models/index";export const findUserByEmail = async (email, options = {}) =>
  User.findOne({
    where: {
      email,
    },
    ...options,
  });
export const findUserById = async (id, options = {}) =>
  User.findOne({
    where: {
      id,
    },
    ...options,
  });
export const createUser = async (user) => User.create(user);
export const updateUser = async (id, user) =>
  User.update(user, {
    where: {
      id,
    },
  });export const findAllUsers = async (options = {}) =>
  User.findAll({
    ...options,
  });export const deleteUser = async (id) =>
  User.destroy({
    where: {
      id,
    },
  });
