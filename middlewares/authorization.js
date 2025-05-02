export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        status: 'error',
        message: `Acceso denegado. Se requiere el rol: ${requiredRole}`
      });
    }
    next();
  };
};
