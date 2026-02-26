import logger from "../config/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
  logger.error(`[${req.method} ${req.originalUrl}] ${err.message}`, {
    stack: err.stack,
    statusCode: err.statusCode || 500,
    isOperational: err.isOperational,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.isOperational ? err.message : "Internal Server Error",
  });
};
