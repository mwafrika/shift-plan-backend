import { StatusCodes } from "http-status-codes";
import { formatResponse } from "../utils/format";
import { findCompanyById, deleteCompany } from "../services/company/company.service";

export const getCompany = async (req, res) => {
  const { id } = req.params;
  const company = await findCompanyById(id);

  if (!company) { return formatResponse(res, StatusCodes.NOT_FOUND, null, "Company not found"); }
  return formatResponse(res, StatusCodes.OK, company);
};

export const deleteExistingCompany = async (req, res) => {
  const { id } = req.params;
  const company = await findCompanyById(id);
  if (!company) { return formatResponse(res, StatusCodes.NOT_FOUND, null, "Company not found"); }
  await deleteCompany(id);
  return formatResponse(res, StatusCodes.OK, null, "Company deleted");
};
