import Joi from "joi";

const userSchemaValidation = Joi.object({
  name: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email should be a valid email",
      "any.required": "Email is a required field"
    }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base":
        "Password should have at least one uppercase, one lowercase, one number and one special character",
      "any.required": "Password is a required field"
    }),
  isActive: Joi.boolean()
    .optional()
    .valid(true, false)
    .default(false)
    .messages({
      "boolean.base": "isActive should be a boolean",
      "any.only": "isActive should be either true or false"
    }),
  profilePicture: Joi.string().optional().uri().messages({
    "string.base": "Photo should be a string",
    "string.uri": "Photo should be a valid uri"
  }),
  roleId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "roleId should be a number",
      "number.integer": "roleId should be an integer",
      "number.positive": "roleId should be a positive number"
    }),
  phone: Joi.string()
    .pattern(/^\+?[0-9()\-\s]+$/)
    .optional()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Phone should be a valid phone number"
    }),
  departmentId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "departmentId should be a number",
      "number.integer": "departmentId should be an integer",
      "number.positive": "departmentId should be a positive number"
    }),
  address: Joi.string().min(3).max(100).optional()
    .messages({
      "string.base": "Address should be a string",
      "string.min": "Address should have a minimum length of {#limit}",
      "string.max": "Address should have a maximum length of {#limit}"
    }),
  country: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "Country should be a string",
      "string.min": "Country should have a minimum length of {#limit}",
      "string.max": "Country should have a maximum length of {#limit}"
    }),
  city: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "City should be a string",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}"
    }),
  description: Joi.string().min(6).max(200).optional()
    .messages({
      "string.base": "Description should be a string",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}"
    }),
  companyId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "companyId should be a number",
      "number.integer": "companyId should be an integer",
      "number.positive": "companyId should be a positive number"
    })
});

export const userCreatedByAdmin = Joi.object({
  name: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email should be a valid email",
      "any.required": "Email is a required field"
    }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    .optional()
    .messages({
      "string.base": "Password should be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base":
        "Password should have at least one uppercase, one lowercase, one number and one special character",
      "any.required": "Password is a required field"
    }),
  isActive: Joi.boolean()
    .optional()
    .valid(true, false)
    .default(false)
    .messages({
      "boolean.base": "isActive should be a boolean",
      "any.only": "isActive should be either true or false"
    }),
  profilePicture: Joi.string().optional().uri().messages({
    "string.base": "Photo should be a string",
    "string.uri": "Photo should be a valid uri"
  }),
  roleId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "roleId should be a number",
      "number.integer": "roleId should be an integer",
      "number.positive": "roleId should be a positive number"
    }),
  phone: Joi.string()
    .pattern(/^\+?[0-9()\-\s]+$/)
    .optional()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Phone should be a valid phone number"
    }),
  departmentId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "departmentId should be a number",
      "number.integer": "departmentId should be an integer",
      "number.positive": "departmentId should be a positive number"
    }),
  address: Joi.string().min(3).max(100).optional()
    .messages({
      "string.base": "Address should be a string",
      "string.min": "Address should have a minimum length of {#limit}",
      "string.max": "Address should have a maximum length of {#limit}"
    }),
  country: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "Country should be a string",
      "string.min": "Country should have a minimum length of {#limit}",
      "string.max": "Country should have a maximum length of {#limit}"
    }),
  city: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "City should be a string",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}"
    }),
  description: Joi.string().min(6).max(200).optional()
    .messages({
      "string.base": "Description should be a string",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}"
    }),
  companyId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "companyId should be a number",
      "number.integer": "companyId should be an integer",
      "number.positive": "companyId should be a positive number"
    })
});

export const validateIdOnly = Joi.object({
  id: Joi.number().integer().positive().required()
    .messages({
      "number.base": "Id should be a number",
      "number.empty": "Id cannot be empty",
      "number.integer": "Id should be an integer",
      "number.positive": "Id should be a positive number",
      "any.required": "Id is a required field"
    })
});
export default userSchemaValidation;
