import { StatusCodes } from "http-status-codes";
import {
  findCompanyById,
  updateCompany,
  deleteCompany,
  findAllCompanies
} from "../services/company/company.service";
import { formatResponse } from "../utils/format";
import { findUserWhere, updateUser } from "../services/auth/auth.service";

export const ApproveDenyCompany = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const company = await findCompanyById(id);
  if (!company) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company does not exist"
    );
  }

  const user = await findUserWhere({ companyId: company.id });

  if (!user) {
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
  }
  const updatedUser = await updateUser(id, {
    isActive: true
  });
  const updatedCompany = await updateCompany(company.id, {
    status: status === "approved" ? "active" : "inactive"
  });
  if (!updatedUser || !updatedCompany) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Unable to update user and company"
    );
  }
  return formatResponse(res, StatusCodes.OK, {
    message: "User and company updated successfully"
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

export const getAllCompanies = async (req, res) => {
  const companies = await findAllCompanies({
    attributes: [
      "id",
      "companyUrl",
      "companyName",
      "status",
      "createdAt",
      "updatedAt"
    ]
  });

  if (companies.length === 0) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "No companies found"
    );
  }
  return formatResponse(res, StatusCodes.OK, companies);
};

export const updateCompanyById = async (req, res) => {
  const { id } = req.params;
  const editCompany = req.body;

  const oldCompany = await findCompanyById(id);
  if (!oldCompany) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,

      "Company not found"
    );
  }

  const updatedCompany = await updateCompany(oldCompany.id, editCompany);

  return formatResponse(res, StatusCodes.OK, {
    message: "Company updated successfully",
    updatedCompany
  });
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
  return formatResponse(
    res,
    StatusCodes.OK,
    null,
    "company deleted successfully"
  );
};
