import { Department } from "../../database/models/index";

export const createDepartment = async (department) => {
  Department.create(department);
};

export const getAllDepartment = async (where) => {
  Department.findAll({ where });
};

export const getDepartmentById = async (id, option = {}) => {
  Department.findOne({
    where: {
      id,
    },
    ...option,
  });
};

export const updateDepartment = async (id, department, options = {}) =>
  Department.update(department, {
    where: {
      id,
    },
    ...options,
  });

export const deleteDepartment = async (id, option = {}) =>
  Department.destroy({
    where: {
      id,
    },
    ...option,
  });
