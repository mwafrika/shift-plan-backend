import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      companyId: user.companyId
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
export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      text
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
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
