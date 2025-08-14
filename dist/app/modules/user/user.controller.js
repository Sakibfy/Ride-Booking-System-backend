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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
// 🚀 Register user (rider or driver)
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        // console.log(password);
        // ✅ Basic validation
        if (!name || !email || !password || !role) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                success: false,
                message: `${name}, ${email}, ${password}, and ${role} are required.`,
            });
        }
        // ✅ Email uniqueness check
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(http_status_codes_1.default.CONFLICT).json({
                success: false,
                message: 'User already exists.',
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        const newUser = yield user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        // ✅ Exclude password from response
        const _a = newUser.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(http_status_codes_1.default.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: userWithoutPassword,
        });
    }
    catch (err) {
        console.error('User creation error:', err);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Something went wrong: ${err.message}`,
        });
    }
});
// ✅ Get all users (admin only)
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUsers();
        res.status(http_status_codes_1.default.OK).json({ success: true, data: users });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to fetch users',
        });
    }
});
// ✅ Get user by ID (admin only)
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.getUserById(req.params.id);
        if (!user) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(http_status_codes_1.default.OK).json({ success: true, data: user });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to retrieve user',
        });
    }
});
// ✅ Block user (admin)
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.blockUser(req.params.id);
        if (!user) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'User blocked successfully',
            data: user,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to block user',
        });
    }
});
// ✅ Unblock user (admin)
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.unblockUser(req.params.id);
        if (!user) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'User unblocked successfully',
            data: user,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to unblock user',
        });
    }
});
// ✅ Approve driver (admin)
const approveDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield user_service_1.UserService.approveDriver(req.params.id);
        if (!driver) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                success: false,
                message: 'Driver not found or not a driver',
            });
        }
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Driver approved successfully',
            data: driver,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to approve driver',
        });
    }
});
// ✅ Suspend driver (admin)
const suspendDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield user_service_1.UserService.suspendDriver(req.params.id);
        if (!driver) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                success: false,
                message: 'Driver not found or not a driver',
            });
        }
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Driver suspended successfully',
            data: driver,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to suspend driver',
        });
    }
});
const updateDriverAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized. User ID missing.',
            });
        }
        const { isOnline } = req.body;
        const updated = yield user_service_1.UserService.updateDriverAvailability(userId, isOnline);
        if (!updated) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Driver not found or not approved',
            });
        }
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: `Driver is now ${isOnline ? 'Online' : 'Offline'}`,
            data: updated,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to update driver availability',
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    approveDriver,
    suspendDriver,
    updateDriverAvailability,
};
