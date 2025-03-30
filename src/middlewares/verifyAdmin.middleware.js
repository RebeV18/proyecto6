export const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: "No tienes permisos para acceder a este recurso",
      statusCode: 403,
    });
  }
  next();
};
