import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
} from "../../services/auth.service";
import {
  hashPassword,
  generateToken,
  isTokenExpired,
  sendEmail,
} from "../../utils/auth";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Invalid credentials",
    });
  }
  const token = generateToken(user);
  return res.status(StatusCodes.OK).send({
    message: "Login successful",
    token,
  });
};
export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(409).send({
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({ email, password: hashedPassword, name });
    if (!newUser) {
      return res.status(400).send({
        message: "Error while creating user",
      });
    }
    const responseData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    const generatedToken = generateToken(newUser);
    return res.status(StatusCodes.CREATED).send({
      message: "User created successfully",
      token: generatedToken,
      user: responseData,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  const token = generateToken(user);

  const info = await sendEmail(
    email,
    "Password reset",
    `Click on the link to reset your password: http://localhost:3000/reset-password/${user.id}/${token}`,
  );

  return res.status(StatusCodes.OK).send({
    message: "Password reset email sent",
    info,
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  // const isTokenValid = token === generateToken(user);

  const isTokenValid = isTokenExpired(token);

  if (isTokenValid) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }

  const hashedPassword = await hashPassword(password);

  const updatedUser = await updateUser(id, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    return res.status(400).send({
      message: "Error while updating user",
    });
  }

  return res.status(StatusCodes.OK).send({
    message: "Password reset successful",
  });
};
