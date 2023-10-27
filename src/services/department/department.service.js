import { Department } from "../../database/models/index";

export const createDepartment = async (department) => Department.create(department);

export const getAllDepartment = async (criteria = {}, options = {}) => {
  const where = {
    ...criteria
  };

  return Department.findAll({
    where,
    ...options
  });
};

export const getDepartmentById = async (id, option = {}) => Department.findOne({
  where: {
    id
  },
  ...option
});

export const updateDepartment = async (id, department, options = {}) => Department.update(department, {
  where: {
    id
  },
  ...options
});

export const deleteDepartment = async (id, option = {}) => Department.destroy({
  where: {
    id
  },
  ...option
});
