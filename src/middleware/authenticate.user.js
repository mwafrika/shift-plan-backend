import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { formatResponse } from "../utils/format";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      return formatResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        null,
        "Authorization denied, no token provided"
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decodedToken?.id,
      email: decodedToken?.email,
      companyId: decodedToken?.companyId
    };

    return next();
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      null,
      "Authorization denied, invalid token"
    );
  }
};

export default auth;
