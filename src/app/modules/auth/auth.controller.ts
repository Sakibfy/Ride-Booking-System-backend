import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { AuthServices } from './auth.service';


export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      const result = await AuthServices.login(req.body);

   

      res.status(httpStatus.OK).json({
        success: true,
        message: ' Login successful',
        data: result,
      });
    } catch (err: any) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: err.message || 'Login failed',
      });
    }
  },
};
