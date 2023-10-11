import Joi from "joi";

const StatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "denied")
    .required()
    .messages({
      "string.base": "Status should be a string",
      "string.empty": "Status cannot be empty",
      "string.valid": "Status should be either pending, approved or denied"
    })
});

export default StatusSchema;
