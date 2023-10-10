import { Company } from "../../database/models/index";
export const findCompanyById = async (id, options = {}) =>
  Company.findOne({
    where: {
      id,
    },
    ...options,
  });
export const createCompany = async (company) => Company.create(company);
export const updateCompany = async (id, company, options = {}) =>
  Company.update(company, {
    where: {
      id,
    },
    ...options,
  });
export const getCompanyWhere = async (where) => Company.findOne({ where });