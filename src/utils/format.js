export const formatResponse = (
  res,
  statusCode,
  data = null,
  errorMessage = null,
  options = {},
) => {
  const successMessage = 'Success';
  res.status(statusCode);
  const response = {
    message: errorMessage || successMessage,
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
