import { StatusCodes } from "http-status-codes";
import {
  findAllRoles,
  findRoleById,
  findRoleByPK,
  findRoleByName,
  createRole,
  updateRole,
  deleteRole,
} from "../../services/auth/role.service";
import { formatResponse } from "../../utils/format";

export const getRoles = async (req, res) => {
  const roles = await findAllRoles();
  if (roles.length === 0)
    formatResponse(res, StatusCodes.NOT_FOUND, null, "No roles found");
  return formatResponse(res, StatusCodes.OK, roles);
};

export const getRole = async (req, res) => {
  const { id } = req.params;
  const role = await findRoleById(id);

  if (!role)
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "Role not found");
  return formatResponse(res, StatusCodes.OK, role);
};

export const createNewRole = async (req, res) => {
  const { name, description } = req.body;
  const role = await findRoleByName(name);
  if (role) {
    return formatResponse(
      res,
      StatusCodes.CONFLICT,
      null,
      "Role already exists"
    );
  }

  const newRole = await createRole({ name, description });
  return formatResponse(res, StatusCodes.CREATED, newRole);
};

export const updateExistingRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await findRoleById(id);
    if (!role)
      formatResponse(res, StatusCodes.NOT_FOUND, null, "Role not found");
    const updatedRole = await updateRole(id, req.body);
    if (!updatedRole)
      formatResponse(res, StatusCodes.BAD_REQUEST, null, "Role not updated");
    const updatedRoleData = await findRoleById(id);
    return formatResponse(res, StatusCodes.OK, updatedRoleData);
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

export const deleteExistingRole = async (req, res) => {
  const { id } = req.params;
  const role = await findRoleById(id);
  if (!role)
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "Role not found");
  await deleteRole(id);
  return formatResponse(res, StatusCodes.OK, null, "Role deleted");
};
