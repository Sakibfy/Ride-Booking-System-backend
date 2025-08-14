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
exports.DriverController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const driver_service_1 = require("./driver.service");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!driverId) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: Driver ID missing",
            });
        }
        const driver = yield driver_service_1.DriverService.getDriverProfile(driverId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Driver profile fetched successfully",
            data: driver,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: err.message,
        });
    }
});
const getRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!driverId) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: Driver ID missing",
            });
        }
        const rides = yield driver_service_1.DriverService.getDriverRides(driverId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Driver ride history fetched successfully",
            data: rides,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: err.message,
        });
    }
});
const toggleAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { isOnline } = req.body;
        if (!driverId) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: Driver ID missing",
            });
        }
        const driver = yield driver_service_1.DriverService.toggleAvailability(driverId, isOnline);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: `Driver is now ${isOnline ? "online" : "offline"}`,
            data: driver,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: err.message,
        });
    }
});
const getEarnings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!driverId) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: Driver ID missing",
            });
        }
        const earnings = yield driver_service_1.DriverService.getEarnings(driverId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Driver earnings fetched",
            data: earnings,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: err.message,
        });
    }
});
exports.DriverController = {
    getProfile,
    getRides,
    toggleAvailability,
    getEarnings,
};
