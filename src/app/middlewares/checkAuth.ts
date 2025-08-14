import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(403, "No token received");
    }

    const verifiedToken = verifyToken(accessToken, "secret") as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    if (
      isUserExist.isActive === IsActive.BLOCKED ||
      isUserExist.isActive === IsActive.INACTIVE
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `User is ${isUserExist.isActive}`
      );
    }

  

    if (!isUserExist.role || !authRoles.includes(isUserExist.role)) {
      throw new AppError(403, "You are not permitted to view this route!");
    }
    

    req.user = isUserExist; 

    next();
  } catch (error) {
    console.log("JWT Auth Error:", error);
    next(error);
  }
};
