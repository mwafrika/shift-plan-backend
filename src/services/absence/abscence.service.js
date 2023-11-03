import { Absence } from "../../database/models/index";

export const findAbsenceByUserId = async (id, options = {}) => Absence.findOne({
  where: {
    id
  },
  ...options
});

export const createAbsence = async (absence) => Absence.create(absence);
export const updateAbsence = async (id, absence, options = {}) => Absence.update(absence, {
  where: {
    id
  },
  ...options
});

export const findAllAbsences = async (options = {}) => Absence.findAll({
  ...options
});

export const deleteAbsence = async (id) => Absence.destroy({
  where: {
    id
  }
});
