import { User } from "../../database/models/index";

export const findUserByEmail = async (email, options = {}) => User.findOne({
  where: {
    email
  },
  ...options
});

export const findUserById = async (
  id,
  additionalConditions = {},
  options = {}
) => User.findOne({
  where: {
    id,
    ...additionalConditions
  },
  ...options
});

export const createUser = async (user) => User.create(user);

export const updateUser = async (id, user) => User.update(user, {
  where: {
    id
  }
});

export const findAllUsers = async (options = {}) => User.findAll({
  ...options
});

export const deleteUser = async (id) => User.destroy({
  where: {
    id
  }
});