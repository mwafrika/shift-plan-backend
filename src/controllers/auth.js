import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  findAllUsers,
  deleteUser
} from "../services/auth/auth.service";
import { createCompany } from "../services/company/company.service";
import {
  hashPassword,
  generateToken,
  sendEmail,
  isTokenExpired
} from "../utils/auth";
import { formatResponse } from "../utils/format";

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
        "Error while creating user",
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

    return formatResponse(res, StatusCodes.CREATED, {
      message: "Company created successfully",
      token: generatedToken,
      user: responseUser,
      company: responseCompany
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
  const user = await findUserByEmail(email, {
    include: "role"
  });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = generateToken(user);
      return formatResponse(res, StatusCodes.OK, { token }, "Login successful");
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
    email,
    "Password reset",
    `Click on the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}`
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
  const { companyId } = req.user;
  try {
    const users = await findAllUsers({
      where: {
        companyId
      },
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
      include: "shifts"
    });

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

export const getUser = async (req, res) => {
  const { id, companyId } = req.params;

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
  const { id, companyId } = req.params;
  const {
    name, email, password, profilePicture
  } = req.body;

  try {
    const user = await findUserById(id, {
      companyId
    });

    if (!user) {
      return formatResponse(res, StatusCodes.NOT_FOUND, [], "User not found");
    }

    const hashedPassword = await hashPassword(password);

    const updatedUser = await updateUser(id, {
      name,
      email,
      password: hashedPassword,
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

export const deleteUserData = async (req, res) => {
  const { id, companyId } = req.params;
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

export const createUserData = async (req, res) => {
  const { companyId } = req.user;
  const { id } = req.params;
  const {
    name, email, password, profilePicture
  } = req.body;

  const user = await findUserById(id, {
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
    companyId
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
