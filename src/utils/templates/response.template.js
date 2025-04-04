export const response = (res, data, statusCode, message, custom) => {
  res.status(statusCode).json({
    message: message || "Petición procesada con éxito",
    statusCode,
    data,
    ...custom,
  });
};
