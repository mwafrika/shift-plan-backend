import { StatusCodes } from "http-status-codes";
import {
  deleteDepartment,
  getAllDepartment,
  createDepartment,
  updateDepartment,
  getDepartmentById
} from "../services/department/department.service";
import { formatResponse } from "../utils/format";

export const updateDepartmentById = async (req, res) => {
  const { id } = req.params;
  const newDepartment = req.body;

  const oldDepartment = await getDepartmentById(id);

  if (!oldDepartment) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Department not found"
    );
  }

  const UpdatedDepartment = await updateDepartment(
    oldDepartment.id,
    newDepartment
  );

  if (!UpdatedDepartment) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Unable to update department"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Department updated successfully"
  });
};

export const createNewDepartment = async (req, res) => {
  const { companyId } = req.user;
  const { departmentName, departmentManager, departmentDescription } = req.body;

  try {
    const newDepartment = await createDepartment({
      departmentName,
      departmentManager,
      departmentDescription,
      companyId
    });

    if (!newDepartment) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to create department"
      );
    }

    return formatResponse(
      res,
      StatusCodes.CREATED,
      newDepartment,
      "Department created successfully"
    );
  } catch (error) {
    return formatResponse(res, StatusCodes.BAD_REQUEST, null, error.message);
  }
};

export const findAllDepartment = async (req, res) => {
  const { companyId } = req.params;
  const id = req.user.role.name === "superAdmin" ? companyId : req.user.companyId;

  if (!id) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company not found"
    );
  }

  const departments = await getAllDepartment({
    companyId: id
  });
  if (departments) {
    return formatResponse(res, StatusCodes.OK, departments);
  }
  return formatResponse(res, StatusCodes.EXPECTATION_FAILED);
};

export const findDepartmentById = async (req, res) => {
  const { id } = req.params;
  const department = await getDepartmentById(id);

  if (!department) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Department not found"
    );
  }
  return formatResponse(res, StatusCodes.OK, department);
};

export const removeDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await deleteDepartment(id);

  if (!department) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Department not found"
    );
  }
  return formatResponse(res, StatusCodes.OK, department);
};
