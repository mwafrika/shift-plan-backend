import Joi from "joi";

const schema = Joi.object({
  companyName: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),
  companyAddress: Joi.string().min(3).max(100).optional()
    .messages({
      "string.base": "Address should be a string",
      "string.min": "Address should have a minimum length of {#limit}",
      "string.max": "Address should have a maximum length of {#limit}"
    }),

  companyPhone: Joi.string()
    .pattern(/^\+?[0-9()\-\s]+$/)
    .optional()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Phone should be a valid phone number"
    }),
  companyCountry: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),
  companyDescription: Joi.string().min(6).max(200).optional()
    .messages({
      "string.base": "Description should be a string",
      "string.min": "Description should have a minimum length of {#limit}",
      "string.max": "Description should have a maximum length of {#limit}"
    }),
  companyEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email should be a valid email",
      "any.required": "Email is a required field"
    }),
  logo: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),
  userId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "userId should be a number",
      "number.integer": "userId should be an integer",
      "number.positive": "userId should be a positive number"
    }),
  status: Joi.string()
    .valid("pending", "approved", "denied")
    .optional()
    .messages({
      "string.base": "Status should be a string",
      "string.empty": "Status cannot be empty",
      "string.valid": "Status should be either pending, approved or denied"
    }),
  companyCity: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "City should be a string",
      "string.min": "City should have a minimum length of {#limit}",
      "string.max": "City should have a maximum length of {#limit}"
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

export const StatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "denied")
    .required()
    .messages({
      "string.base": "Status should be a string",
      "string.empty": "Status cannot be empty",
      "string.valid": "Status should be either pending, approved or denied"
    })
});
export default schema;
