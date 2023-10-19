import { StatusCodes } from "http-status-codes";
import { formatResponse } from "../utils/format";

export default function permit(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.user) {
      if (req.user.role === "superAdmin") {
        return next();
      }
      if (isAllowed(req.user.role)) {
        return next();
      }
    }
    return formatResponse(
      res,
      StatusCodes.FORBIDDEN,
      null,
      "You are not authorized to access this resource"
    );
  };
}
