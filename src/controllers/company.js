import { StatusCodes } from "http-status-codes";
import { formatResponse } from "../utils/format";
import { findUserWhere, updateUser } from "../services/auth/auth.service";
import {
  findCompanyById,
  updateCompany
} from "../services/company/company.service";

const ApproveDenyCompany = async (req, res) => {
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

export default ApproveDenyCompany;
