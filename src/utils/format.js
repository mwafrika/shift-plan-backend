export const formatResponse = (
  res,
  statusCode,
  data = null,
  errorMessage = null,
  options = {},
) => {
  const message = errorMessage || 'Success';
  res.status(statusCode);
  const response = {
    message,
    data: data || null,
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
    error: errorMessage,
  });
};
