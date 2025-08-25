// import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";


const credentialsLogin = async (payload: Partial<IUser>) => {

    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

  
    const userTokens = createUserTokens(isUserExist)
    


  const { password: pass, ...rest } = isUserExist.toObject()

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest
}

}


const getNewAccessToken = async (refreshToken: string) => {
  
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

  return {
      accessToken: newAccessToken
  }

}

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken
}



