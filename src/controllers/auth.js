import { StatusCodes } from 'http-status-codes';
import { findUserByEmail, createUser } from '../services/auth/auth.service';
import { createCompany } from '../services/company/company.service';
import { hashPassword, generateToken } from '../utils/auth';
import { formatResponse } from '../utils/format';

export const register = async (req, res) => {
  const {
    email,
    password,
    name,
    companyName,
    companyAddress,
    companyPhone,
    // roleId,
  } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) { return formatResponse(res, StatusCodes.CONFLICT, null, 'User exists'); }

    const hashedPassword = await hashPassword(password);

    const newCompany = await createCompany({
      companyAddress,
      companyName,
      companyPhone,
      // userId: newUser.id,
    });

    const newUser = await createUser({
      email,
      password: hashedPassword,
      name,
      companyId: newCompany.id,
      // roleId,
    });

    if (!newUser || !newCompany) {
      formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        'Error while creating user',
      );
    }
    const responseUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      companyId: newUser.companyId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      // roleId: newUser.roleId,
    };

    const responseCompany = {
      id: newCompany.id,
      name: newCompany.companyName,
      address: newCompany.companyAddress,
      phone: newCompany.companyPhone,
      createdAt: newCompany.createdAt,
      updatedAt: newCompany.updatedAt,
    };

    const generatedToken = generateToken(newUser);

    return formatResponse(res, StatusCodes.CREATED, {
      message: 'Company created successfully',
      token: generatedToken,
      user: responseUser,
      company: responseCompany,
    });
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message,
    );
  }
};

