import bcrypt from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { IUser } from '../user/user.interface';
import jwt from "jsonwebtoken"
import { User } from '../user/user.model';

export const login =  async (payload: Partial<IUser>) => {
  
    const { email, password } = payload
    
  const isUserExist = await User.findOne({ email });
  
    // console.log('Login Input Password:', password);
    // console.log('Hashed from DB:',);
    

    if (!isUserExist) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User Invalid credentials');
    }

    if (isUserExist.isBlocked) {
      throw new Error('Your account is blocked');
    }

    if (!password || !isUserExist.password) {
      throw new Error(
        'No password found. You may have registered using Google. Please log in with Google or set a password.'
      );
    }

  
  //   const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
  //   console.log('Password Match:', password);

  //   if (!isPasswordMatched) {
  //        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
  // }
  

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
}
  const accessToken = jwt.sign(jwtPayload, "secret",
    {
      expiresIn: "3d"
    }
  )

    return {
      accessToken
    };
  }

  export const AuthServices = {
  login

}