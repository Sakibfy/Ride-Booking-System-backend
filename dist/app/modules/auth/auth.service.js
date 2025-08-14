"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = exports.login = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.findOne({ email });
    // console.log('Login Input Password:', password);
    // console.log('Hashed from DB:',);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'User Invalid credentials');
    }
    if (isUserExist.isBlocked) {
        throw new Error('Your account is blocked');
    }
    if (!password || !isUserExist.password) {
        throw new Error('No password found. You may have registered using Google. Please log in with Google or set a password.');
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
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, "secret", {
        expiresIn: "3d"
    });
    return {
        accessToken
    };
});
exports.login = login;
exports.AuthServices = {
    login: exports.login
};
