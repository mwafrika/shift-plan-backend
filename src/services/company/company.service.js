import { Company } from "../../database/models/index";

export const findCompanyById = async (id, options = {}) => Company.findOne({
  where: {
    id
  },
  ...options
});

export const createCompany = async (company) => Company.create(company);
export const getCompanyWhere = async (where) => Company.findOne({ where });

export const findCompanyByPK = async (id, options = {}) => Company.findByPk(id, options);

export const findCompanyByName = async (name, options = {}) => Company.findOne({
  where: {
    name
  },
  ...options
});

export const deleteCompany = async (id) => Company.destroy({
  where: {
    id
  }
});
