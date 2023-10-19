export const formatResponse = (
  res,
  statusCode,
  data = undefined,
  message = undefined,
  options = {}
) => {
  res.status(statusCode);
  const response = {
    message,
    data: data || undefined
  };

  if (options.include) {
    response.include = options.include;
  }

  if (options.order) {
    response.order = options.order;
  }
  res.json(response);
};

export const formatError = (res, statusCode, errorMessage) => {
  res.status(statusCode);
  res.json({
    error: errorMessage
  });
};

export const validateDate = (startDate = null, endDate = null) => (value, helpers) => {
  if (!value) {
    return helpers.error("any.required");
  }

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(value)) {
    return helpers.error("date.format");
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate) || parsedDate <= new Date()) {
    return helpers.error("date.greater");
  }

  if (startDate && endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (parsedDate < startDateObj || parsedDate > endDateObj) {
      return helpers.error("date.interval", { startDate, endDate });
    }
  }

  return value;
};
