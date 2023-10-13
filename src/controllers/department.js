import { StatusCodes } from "http-status-codes";
import {
  deleteDepartment,
  getAllDepartment,
  createDepartment,
  updateDepartment,
  getDepartmentById,
} from "../services/department/department.service";
import { formatResponse } from "../utils/format";

export const updateDepartmentById = async (req, res) => {
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

export const createNewDepartment =async(req, res) => {
    const { departmentName,
      departmentManager,
      departmentDescription,
      companyId} = req.body

    const newDepartment = await createDepartment({
      departmentName,
      departmentManager,
      departmentDescription,
      companyId})
    
      if(newDepartment){
        return formatResponse(
          res, StatusCodes.CREATED, 
          {message: "Department created successfully",
          department: newDepartment,
        })
      }
    
    return formatResponse(
        res, StatusCodes.INTERNAL_SERVER_ERROR, 
        {message: "Failed to create department ",
      }
    )
}

export const findAllDepartment = async(req, res) => {
  const departments = await getAllDepartment();
  if(departments){
    return formatResponse(res, StatusCodes.OK, departments);
  }
  return  formatResponse(res, StatusCodes.EXPECTATION_FAILED)

}

