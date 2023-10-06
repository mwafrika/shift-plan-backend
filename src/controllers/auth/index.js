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
    `Click on the link to reset your password: http://localhost:3000/reset-password/${user.id}/${token}`
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
