import { StatusCodes } from 'http-status-codes';
import {
  findCompanyById,
  updateCompany,
} from '../services/company/company.service';
import { formatResponse } from '../utils/format';

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
      'Company not found',
    );
  }

  const updatedCompany = await updateCompany(oldCompany.id, editCompany);

  if (!updatedCompany) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      'Unable to update  company',
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: 'Company updated successfully',
  });
};
