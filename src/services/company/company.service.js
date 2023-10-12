import { Company } from "../../database/models/index";

export const findAllCompanies = async (options = {}) =>
  Company.findAll({
    ...options,
  });