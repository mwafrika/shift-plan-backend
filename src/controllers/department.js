import { StatusCodes } from "http-status-codes";
import {
  deleteDepartment,
  getAllDepartment,
  createDepartment,
  updateDepartment,
  getDepartmentById,
} from "../services/department/department.service";
import { formatResponse } from "../utils/format";

export const updateDepartmentById = async () => {
  const { id } = req.params;
  const newDepartment = req.body;

  const oldDepartment = await getDepartmentById(id);

  if (!oldDepartment){
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Department not found",
    );
  }

  const UpdatedDepartment = await updateDepartment(
    oldDepartment.id,
    newDepartment,
  );

  if (!UpdatedDepartment) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Unable to update department",
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Department created successfully",
  });
};

export const createNewDepartment =() => {
    const department = req.body
    const newDepartment = createDepartment({department})
    return formatResponse(
        res, StatusCodes.OK, 
        {message: "Department crested successfully"}
    )
}
