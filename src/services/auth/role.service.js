import { Role } from "../../database/models/index";

export const findRoleById = async (id, options = {}) => Role.findOne({
  where: {
    id
  },
  ...options
});
export const findRoleByPK = async (id, options = {}) => Role.findByPk(id, options);
export const findRoleByName = async (name, options = {}) => Role.findOne({
  where: {
    name
  },
  ...options
});
export const createRole = async (role) => Role.create(role);
export const updateRole = async (id, role, options = {}) => Role.update(role, {
  where: {
    id
  },
  ...options
});
export const deleteRole = async (id) => Role.destroy({
  where: {
    id
  }
});
export const findAllRoles = async (options = {}) => Role.findAll({
  ...options
});
