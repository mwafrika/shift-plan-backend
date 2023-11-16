import Joi from "joi";

const shiftSchema = Joi.object({
  employee: Joi.string().min(3).max(20).optional()
    .messages({
      "string.base": "Employee should be a string",
      "string.min": "Employee should have a minimum length of {#limit}",
      "string.max": "Employee should have a maximum length of {#limit}"
    }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Invalid date format",
    "date.iso": "Date must be in ISO format (YYYY-MM-DD)"
  }),
  endDate: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Invalid date format",
      "date.iso": "Date must be in ISO format (YYYY-MM-DD)"
    })
    .min(Joi.ref("startDate"))
    .messages({
      "date.min": "End date cannot be before the start date"
    }),
  startTime: Joi.string()
    .pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid time format (HH:mm)"
    }),
  endTime: Joi.string()
    .pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid time format (HH:mm)"
    }),
  // userId: Joi.number().integer().positive().optional()
  //   .messages({
  //     "number.base": "userId should be a number",
  //     "number.integer": "userId should be an integer",
  //     "number.positive": "userId should be a positive number"
  //   })
  userId: Joi.optional().messages({
    "number.base": "userId should be a number",
    "number.integer": "userId should be an integer",
    "number.positive": "userId should be a positive number"
  })
});

export default shiftSchema;
