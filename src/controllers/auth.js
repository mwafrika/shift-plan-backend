import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../services/auth/auth.service";
import { createCompany } from "../services/company/company.service";
import { hashPassword, generateToken } from "../utils/auth";
import { formatResponse } from "../utils/format";

export const register = async (req, res) => {
  const { email, password, name, companyName, companyAddress, companyPhone } =
    req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return formatResponse(res, StatusCodes.CONFLICT, null, "User exists");
    }

    const hashedPassword = await hashPassword(password);

    const newCompany = await createCompany({
      companyAddress,
      companyName,
      companyPhone,
    });

    const newUser = await createUser({
      email,
      password: hashedPassword,
      name,
      companyId: newCompany.id,
    });

    if (!newUser || !newCompany) {
      formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Error while creating user",
      );
    }
    const responseUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      companyId: newUser.companyId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
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
      message: "Company created successfully",
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid){
        const token = generateToken(user);
        return formatResponse(res, StatusCodes.OK, { token });
       }
  }
  
    return formatResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      null,
      "Invalid credentials"
    );
};
