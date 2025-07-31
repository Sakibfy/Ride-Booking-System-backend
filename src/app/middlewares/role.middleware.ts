import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { AuthenticatedRequest } from './auth.middleware';

/**
 * Role-based middleware to restrict access to specific roles.
 * @param roles One or more roles (e.g., 'admin', 'driver', 'rider')
 */
export const checkRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: 'Forbidden: You do not have permission to access this resource.',
      });
    }

    next();
  };
};
