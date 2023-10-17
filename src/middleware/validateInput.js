import { StatusCodes } from "http-status-codes";
import userSchema, { validateIdOnly } from "../services/auth/schema";
import absenceSchema from "../services/absence/schema";

export const validateData = (req, res, next, data, validationSchema) => {
  const { error } = validationSchema.validate(data);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
  }
  return next();
};

export const validateUserData = (req, res, next) => {
  const data = req.body;
  const validationSchema = userSchema;
  validateData(req, res, next, data, validationSchema);
};

export const validateID = (req, res, next) => {
  const { id } = req.params;
  const validationSchema = validateIdOnly;
  validateData(req, res, next, { id }, validationSchema);
};

export const validateAbsenceData = (req, res, next) => {
  const data = req.body;
  const validationSchema = absenceSchema;
  validateData(req, res, next, data, validationSchema);
};
