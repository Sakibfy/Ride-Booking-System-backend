import { Response } from 'express';

/**
 * Send a standardized API response
 */
export const sendResponse = <T>(
  res: Response,
  {
    statusCode = 200,
    success = true,
    message = 'Request successful',
    data = null,
    meta,
  }: {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: T | null;
    meta?: Record<string, any>;
  }
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
    ...(meta && { meta }), // optional pagination or extra info
  });
};
