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
exports.AuthController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        success: false,
                        message: 'Email and password are required',
                    });
                }
                const result = yield auth_service_1.AuthServices.login(req.body);
                res.status(http_status_codes_1.default.OK).json({
                    success: true,
                    message: ' Login successful',
                    data: result,
                });
            }
            catch (err) {
                res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: err.message || 'Login failed',
                });
            }
        });
    },
};
