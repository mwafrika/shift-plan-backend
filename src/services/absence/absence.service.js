import { Absence } from "../../database/models/index";

export const createAbsence = async (absence) => Absence.create(absence);

export const getAllAbsence = async () => Absence.findAll();

export const getAbsenceById = async (id, option = {}) => Absence.findOne({
  where: {
    id
  },
  ...option
});

export const updateAbsence = async (id, absence, options = {}) => Absence.update(absence, {
  where: {
    id
  },
  ...options
});

export const deleteAbsence = async (id, option = {}) => Absence.destroy({
  where: {
    id
  },
  ...option
});
