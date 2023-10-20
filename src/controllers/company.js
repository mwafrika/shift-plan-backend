import { StatusCodes } from "http-status-codes";
import {
  findCompanyById,
  updateCompany,
  deleteCompany
} from "../services/company/company.service";
import { formatResponse } from "../utils/format";

export const updateCompanyById = async (req, res) => {
  const { id } = req.params;
  const editCompany = req.body;

  const oldCompany = await findCompanyById(id);
  console.log(oldCompany.id);
  if (!oldCompany) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company not found"
    );
  }

  const updatedCompany = await updateCompany(oldCompany.id, editCompany);

  if (!updatedCompany) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Company not updated"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Company updated successfully"
  });
};

export const getCompany = async (req, res) => {
  const { id } = req.params;
  const company = await findCompanyById(id);

  if (!company) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company not found"
    );
  }
  return formatResponse(res, StatusCodes.OK, company);
};

export const deleteExistingCompany = async (req, res) => {
  const { id } = req.params;
  const company = await findCompanyById(id);
  if (!company) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company not found"
    );
  }

  await deleteCompany(id);
  return formatResponse(res, StatusCodes.OK, null, "Company deleted");
};
