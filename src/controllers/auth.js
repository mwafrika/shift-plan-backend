import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  findAllUsersWhere,
  deleteUser,
  findUserWhere
} from "../services/auth/auth.service";
import { createCompany } from "../services/company/company.service";
import { hashPassword, generateToken, isTokenExpired } from "../utils/auth";
import { sendEmail } from "../utils/email";
import { formatResponse } from "../utils/format";
import { findRoleByName } from "../services/auth/role.service";
import { getDepartmentById } from "../services/department/department.service";

export const register = async (req, res) => {
  const {
    email, password, name, companyName, companyAddress, companyPhone
  } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return formatResponse(res, StatusCodes.CONFLICT, null, "User exists");
    }

    const hashedPassword = await hashPassword(password);

    const newCompany = await createCompany({
      companyAddress,
      companyName,
      companyPhone
    });

    // const findDepartment = await getDepartmentById();

    const newUser = await createUser({
      email,
      password: hashedPassword,
      name,
      companyId: newCompany.id
    });

    if (!newUser || !newCompany) {
      formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Error while creating user"
      );
    }
    const responseUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      companyId: newUser.companyId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    const responseCompany = {
      id: newCompany.id,
      name: newCompany.companyName,
      address: newCompany.companyAddress,
      phone: newCompany.companyPhone,
      createdAt: newCompany.createdAt,
      updatedAt: newCompany.updatedAt
    };

    const generatedToken = generateToken(newUser);

    await sendEmail(
      newUser,
      "Account verification",
      `${process.env.FRONTEND_URL}/verify-account/${newUser.id}/${generatedToken}`,
      "verifyAccount"
    );

    return formatResponse(res, StatusCodes.CREATED, {
      message: "Company created successfully, Please verify your email",
      token: generatedToken,
      user: responseUser,
      company: responseCompany
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

export const verifyAccount = async (req, res) => {
  const { id, token } = req.params;

  const user = await findUserById(id);

  if (!user) {
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
  }

  const isTokenValid = isTokenExpired(token);

  if (isTokenValid) {
    return formatResponse(res, StatusCodes.UNAUTHORIZED, null, "Token expired");
  }

  const updatedUser = await updateUser(id, {
    isActive: true
  });

  if (!updatedUser) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Error updating user"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Account verified successfully"
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email, {
    include: "role"
  });

  console.log(user, "Users with data");

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = generateToken(user);
      return formatResponse(
        res,
        StatusCodes.OK,
        { token, user },
        "Login successful"
      );
    }
  }

  return formatResponse(
    res,
    StatusCodes.UNAUTHORIZED,
    null,
    "Invalid credentials"
  );
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");

  const token = generateToken(user);

  const info = await sendEmail(
    user,
    "Password reset",
    `${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}`,
    "forgetPassword"
  );

  return formatResponse(res, StatusCodes.OK, {
    message: "Password reset email sent",
    info
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (!user) {
    return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
  }

  const isTokenValid = isTokenExpired(token);

  if (isTokenValid) {
    return formatResponse(res, StatusCodes.UNAUTHORIZED, null, "Token expired");
  }

  const hashedPassword = await hashPassword(password);

  const updatedUser = await updateUser(id, {
    password: hashedPassword
  });

  if (!updatedUser) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Error updating user"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Password updated successfully"
  });
};

export const getUsers = async (req, res) => {
  const { companyId, role } = req.user;
  const roleByName = await findRoleByName(role);

  try {
    const users = await findAllUsersWhere(
      {
        companyId,
        roleId: {
          [Op.ne]: roleByName.id
        }
      },
      {
        attributes: [
          "id",
          "name",
          "email",
          "roleId",
          "companyId",
          "departmentId",
          "isActive",
          "profilePicture",
          "createdAt",
          "updatedAt"
        ],
        include: [
          {
            association: "role",
            attributes: ["id", "name"]
          },

          {
            association: "company",
            attributes: ["id", "companyName", "companyAddress", "companyPhone"],
            include: [
              {
                association: "departments",
                attributes: ["id", "departmentName", "departmentManager"]
              }
            ]
          },
          {
            association: "shifts"
          },
          {
            association: "department",
            attributes: ["id", "departmentName", "departmentManager"]
          }
        ]
      }
    );

    if (users.length === 0) {
      return formatResponse(res, StatusCodes.NOT_FOUND, [], "Users not found");
    }
    return formatResponse(res, StatusCodes.OK, users);
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

export const deleteUserData = async (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;
  try {
    const user = await findUserById(id, {
      companyId
    });

    if (!user) {
      return formatResponse(res, StatusCodes.NOT_FOUND, [], "User not found");
    }

    const deletedUser = await deleteUser(user.id);

    if (!deletedUser) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Error deleting user"
      );
    }

    return formatResponse(res, StatusCodes.OK, {
      message: "User deleted successfully"
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

export const getUser = async (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;

  try {
    const user = await findUserById(
      id,
      {
        companyId
      },
      {
        attributes: [
          "id",
          "name",
          "email",
          "roleId",
          "companyId",
          "departmentId",
          "isActive",
          "profilePicture",
          "createdAt",
          "updatedAt"
        ]
      }
    );

    if (!user) {
      return formatResponse(res, StatusCodes.NOT_FOUND, [], "User not found");
    }
    return formatResponse(res, StatusCodes.OK, user);
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;
  const { name, email, profilePicture } = req.body;

  try {
    const user = await findUserById(id, {
      companyId
    });

    if (!user) {
      return formatResponse(res, StatusCodes.NOT_FOUND, [], "User not found");
    }

    const updatedUser = await updateUser(id, {
      name,
      email,
      profilePicture
    });

    if (!updatedUser) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Error updating user"
      );
    }

    return formatResponse(res, StatusCodes.OK, {
      message: "User updated successfully",
      updatedUser
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

export const createUserData = async (req, res) => {
  const { companyId } = req.user;
  const {
    name, email, password, profilePicture, departmentId
  } = req.body;

  const user = await findUserWhere({
    companyId,
    email
  });

  if (user) {
    return formatResponse(res, StatusCodes.CONFLICT, null, "User exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    profilePicture,
    companyId,
    roleId: 4,
    departmentId
  });

  if (!newUser) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Error creating user"
    );
  }

  const token = generateToken(newUser);

  return formatResponse(res, StatusCodes.CREATED, {
    message: "User created successfully",
    token,
    newUser
  });
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;

  const user = await findUserById(id, {
    companyId
  });

  if (!user) {
    return formatResponse(res, StatusCodes.NOT_FOUND, [], "User not found");
  }

  const updatedUser = await updateUser(id, {
    roleId: req.body.roleId
  });

  if (!updatedUser) {
    return formatResponse(
      res,
      StatusCodes.BAD_REQUEST,
      null,
      "Error updating user"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "User updated successfully",
    updatedUser
  });
};
