import { Company } from "../../database/models/index";

export const findCompanyById = async (id, options = {}) => Company.findOne({
  where: {
    id
  },
  ...options
});

export const createCompany = async (company) => Company.create(company);
export const getCompanyWhere = async (where) => Company.findOne({ where });

export const findAllCompanies = async (options = {}) =>
  Company.findAll({
    ...options,
  });
