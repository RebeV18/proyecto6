export const response = (
  res,
  data,
  statusCode = 200,
  message = "Success",
  custom = {}
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    statusCode,
    ...custom,
  });
};
