import { StatusCodes } from "http-status-codes";
import userSchema, { validateIdOnly } from "../services/auth/schema";
import schemaCompany from "../services/company/schema";

export const validateData = (req, res, next, data, validationSchema) => {
  console.log(data, "data");
  const { error } = validationSchema.validate(data);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
  }
  next();
};

export const validateUserData = (req, res, next) => {
  const data = req.body;
  const validationSchema = userSchema;
  validateData(req, res, next, data, validationSchema);
};

export const validateCompanyData = (req, res, next) => {
  const data = req.body;
  const validationSchema = schemaCompany;
  validateData(req, res, next, data, validationSchema);
};

export const validateID = (req, res, next) => {
  const { id } = req.params;
  const validationSchema = validateIdOnly;
  validateData(req, res, next, { id }, validationSchema);
};
