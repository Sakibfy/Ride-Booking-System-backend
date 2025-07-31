import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { verifyToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    email: string;
    role: 'admin' | 'rider' | 'driver';
  };
}

export const checkAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
