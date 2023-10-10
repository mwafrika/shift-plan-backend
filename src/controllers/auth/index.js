import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
  findAllUsers,
  deleteUser,
} from "../../services/auth/auth.service";
import {
  createCompany,
  findCompanyById,
  updateCompany,
  getCompanyWhere,
} from "../../services/company/company.service";
import {
  hashPassword,
  generateToken,
  isTokenExpired,
  sendEmail,
} from "../../utils/auth";
import { formatResponse } from "../../utils/format";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    formatResponse(res, StatusCodes.UNAUTHORIZED, null, "Invalid password");

  const token = generateToken(user);
  return formatResponse(res, StatusCodes.OK, { token });
};
export const register = async (req, res) => {
  const {
    email,
    password,
    name,
    company_name,
    company_address,
    company_phone,
    roleId,
  } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user)
      return formatResponse(res, StatusCodes.CONFLICT, null, "User exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({
      email,
      password: hashedPassword,
      name,
      roleId,
    });
    const newCompany = await createCompany({
      company_name,
      company_address,
      company_phone,
      userId: newUser.id,
    });
    if (!newUser || !newCompany)
      formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Error while creating user"
      );
    const responseUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      roleId: newUser.roleId,
    };

    const responseCompany = {
      id: newCompany.id,
      name: newCompany.company_name,
      address: newCompany.company_address,
      phone: newCompany.company_phone,
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
      error.message
    );
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");

  const token = generateToken(user);

  const info = await sendEmail(
    email,
    "Password reset",
    `Click on the link to reset your password: http://localhost:3000/reset-password/${user.id}/${token}`
  );

  return formatResponse(res, StatusCodes.OK, {
    message: "Password reset email sent",
    info,
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (!user) formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");

  const isTokenValid = isTokenExpired(token);

  if (isTokenValid)
    formatResponse(res, StatusCodes.UNAUTHORIZED, null, "Token expired");

  const hashedPassword = await hashPassword(password);

  const updatedUser = await updateUser(id, {
    password: hashedPassword,
  });

  if (!updatedUser)
    formatResponse(res, StatusCodes.BAD_REQUEST, null, "Error updating user");

  return formatResponse(res, StatusCodes.OK, {
    message: "Password updated successfully",
  });
};

export const getAllUsers = async (req, res) => {
  const users = await findAllUsers({
    attributes: ["id", "name", "email", "address", "createdAt", "updatedAt"],
    include: "role",
  });
  return formatResponse(res, StatusCodes.OK, users);
};

export const removeUser = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
  const isDeleted = await deleteUser(id);
  if (!isDeleted)
    formatResponse(res, StatusCodes.BAD_REQUEST, null, "Error deleting user");

  return formatResponse(res, StatusCodes.OK, {
    message: "User deleted successfully",
  });
};

export const updateUserAndCompanyById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await findUserById(id);

  if (!user)
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");

  const company = await getCompanyWhere({ userId: user.dataValues.id });
  if (!company)
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Company not found"
    );

  const updatedUser = await updateUser(id, {
    isActive: true,
  });

  const updatedCompany = await updateCompany(company.id, {
    status: status === "approved" ? "active" : "inactive",
  });

  if (!updatedUser || !updatedCompany)
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Unable to update user and company"
    );

  return formatResponse(res, StatusCodes.OK, {
    message: "User and company updated successfully",
  });
};
