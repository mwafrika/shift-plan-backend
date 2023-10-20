import { StatusCodes } from "http-status-codes";
import { formatResponse } from "../../utils/format";
import { findAllCompanies } from "../../services/company/company.service";

export const getAllCompanies = async (req, res) => {
  const companies = await findAllCompanies({
    attributes: ["id", "companyUrl", "companyName", "companyAddress", "companyCity", "companyCountry", "status", "companyDescription", "companyPhone", "companyEmail", "logo", "createdAt", "updatedAt"]
  });
  return formatResponse(res, StatusCodes.OK, companies);
};
