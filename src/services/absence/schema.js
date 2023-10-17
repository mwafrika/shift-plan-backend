import Joi from "joi";

const schema = Joi.object({
  reason: Joi.string().min(6).max(200).optional()
    .messages({
      "string.base": "reason should be a string",
      "string.min": "reason should have a minimum length of {#limit}",
      "string.max": "reason should have a maximum length of {#limit}"
    }),

  date: Joi.date().required()
    .messages({
      "date:base": "starting date must be a valid date",
      "date.required": "starting date is required",
      "date.format": "starting date must be in the format YYYY-MM-DD"
    }),

  userId: Joi.number().integer().positive().optional()
    .messages({
      "number.base": "userId should be a number",
      "number.integer": "userId should be an integer",
      "number.positive": "userId should be a positive number"
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
export default schema;
