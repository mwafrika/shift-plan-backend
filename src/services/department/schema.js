import Joi from "joi";

const departmentSchema = Joi.object({
  departmentName: Joi.string().min(6).max(30).required()
    .messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field"
    }),

  departmentManager: Joi.string().min(3).max(30).optional()
    .message({
      "string.base": "Manager should be a string",
      "string.empty": "Manager cannot be empty",
      "string.min": "Manager should have a minimum length of {#limit}",
      "string.max": "Manager should have a maximum length of {#limit}"
    }),

  departmentDescription: Joi.string().min(6).max(200).optional()
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

export default departmentSchema;
