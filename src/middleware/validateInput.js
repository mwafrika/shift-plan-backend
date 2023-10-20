import { StatusCodes } from "http-status-codes";
import userSchema, { validateIdOnly } from "../services/auth/schema";
import shiftSchema from "../services/shift/shema";
import userSchemaValidation from "../services/auth/userSchema";
import StatusSchema from "../services/company/schema";

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

export const validateShiftData = (req, res, next) => {
  const data = req.body;
  const validationSchema = shiftSchema;
  validateData(req, res, next, data, validationSchema);
};

export const validateID = (req, res, next) => {
  const { id } = req.params;
  const validationSchema = validateIdOnly;
  validateData(req, res, next, { id }, validationSchema);
};

export const validateDepartmentData = (req, res, next) => {
  const data = req.body;
  const validationSchema = departmentSchema;
  validateData(req, res, next, data, validationSchema);
};

export const validateUserInfo = (req, res, next) => {
  const data = req.body;
  const validationSchema = userSchemaValidation;
  validateData(req, res, next, data, validationSchema);
}

export const validateStatus = (req, res, next) => {
  const { status } = req.body;
  const validationSchema = StatusSchema;
  validateData(req, res, next, { status }, validationSchema);
};
