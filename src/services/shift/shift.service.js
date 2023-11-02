// CRUD operations FOR SHIFTS

import { Shift, EmployeeShift } from "../../database/models/index";

export const findShiftById = async (id, options = {}, and = {}) => Shift.findOne({
  where: {
    id,
    ...and
  },
  ...options
});

export const createShift = async (shift) => Shift.create(shift);

export const findAllShifts = async (and = {}, options = {}) => Shift.findAll({
  where: {
    ...and
  },
  ...options
});

export const updateShift = async (shift, criteria = {}, options = {}) => Shift.update(shift, {
  where: {
    ...criteria
  },
  ...options
});

export const deleteShift = async (criteria = {}, options = {}) => Shift.destroy({
  where: {
    ...criteria
  },
  ...options
});

export const getShiftWhere = async (where, options = {}) => Shift.findOne({ where, ...options });

// ASSIGN SHIFT TO EMPLOYEE
export const assignShiftToEmployee = async (employeeShift) => EmployeeShift.create(employeeShift);


