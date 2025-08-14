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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
exports.UserService = {
    // 🔹 Get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.find().select('-password'); // exclude password
        });
    },
    // 🔹 Get a user by ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findById(id).select('-password');
        });
    },
    // 🔹 Block a user (admin)
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).select('-password');
        });
    },
    // 🔹 Unblock a user (admin)
    unblockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).select('-password');
        });
    },
    // 🔹 Approve a driver (admin)
    approveDriver(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findById(id);
            if (!user || user.role !== 'driver')
                return null;
            user.isApproved = true;
            user.isBlocked = false;
            return yield user.save();
        });
    },
    // 🔹 Suspend a driver (admin)
    suspendDriver(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findById(id);
            if (!user || user.role !== 'driver')
                return null;
            user.isApproved = false;
            user.isOnline = false;
            return yield user.save();
        });
    },
    // 🔹 Update driver's availability (driver only)
    updateDriverAvailability(userId, isOnline) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findById(userId);
            if (!user || user.role !== 'driver' || !user.isApproved || user.isBlocked) {
                return null;
            }
            user.isOnline = isOnline;
            return yield user.save();
        });
    }
};
