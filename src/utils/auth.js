import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (user) => {
  console.log(user?.role?.name, "check logged in user");
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user?.role?.name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
  return token;
};
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    return decoded.payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};
