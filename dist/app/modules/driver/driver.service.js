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
exports.DriverService = void 0;
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
const ride_model_1 = require("../ride/ride.model");
exports.DriverService = {
    getDriverProfile(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield user_model_1.User.findOne({ _id: driverId, role: user_interface_1.Role.DRIVER })
                .select("-password")
                .lean();
            if (!driver) {
                throw new Error("Driver not found");
            }
            return driver;
        });
    },
    getDriverRides(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield ride_model_1.Ride.find({ driver: driverId }).sort({ createdAt: -1 }).lean();
            return rides;
        });
    },
    toggleAvailability(driverId, isOnline) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: user_interface_1.Role.DRIVER }, { isOnline }, { new: true }).select("-password");
            if (!driver) {
                throw new Error("Driver not found");
            }
            return driver;
        });
    },
    getEarnings(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield user_model_1.User.findOne({ _id: driverId, role: user_interface_1.Role.DRIVER }).select("totalEarnings").lean();
            if (!driver) {
                throw new Error("Driver not found");
            }
            return {
                totalEarnings: driver.totalEarnings || 0,
            };
        });
    },
    approveDriver(driverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: user_interface_1.Role.DRIVER }, { isApproved: true }, { new: true }).select("-password");
            if (!driver) {
                throw new Error("Driver not found");
            }
            return driver;
        });
    },
};
