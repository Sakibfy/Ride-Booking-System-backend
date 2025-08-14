"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.RideController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ride_service_1 = require("./ride.service");
const mongoose_1 = __importStar(require("mongoose"));
const requestRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const riderIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!riderIdStr) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized: Rider ID missing',
            });
        }
        const riderId = new mongoose_1.default.Types.ObjectId(riderIdStr);
        const { pickupLocation, destinationLocation } = req.body;
        const ride = yield ride_service_1.RideService.requestRide(riderId, pickupLocation, destinationLocation);
        res.status(http_status_codes_1.default.CREATED).json({
            success: true,
            message: 'Ride requested successfully',
            data: ride,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || 'Failed to request ride',
        });
    }
});
const cancelRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const riderIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!riderIdStr) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized: Rider ID missing',
            });
        }
        const riderId = new mongoose_1.default.Types.ObjectId(riderIdStr);
        const rideId = req.params.id;
        const result = yield ride_service_1.RideService.cancelRide(rideId, riderId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Ride cancelled successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || 'Failed to cancel ride',
        });
    }
});
const getMyRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userIdStr) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized: User ID missing',
            });
        }
        const userId = new mongoose_1.default.Types.ObjectId(userIdStr);
        const rides = yield ride_service_1.RideService.getUserRides(userId, role);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Ride history fetched successfully',
            data: rides,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || 'Failed to fetch rides',
        });
    }
});
const acceptRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!driverIdStr) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized: Driver ID missing',
            });
        }
        const driverId = new mongoose_1.default.Types.ObjectId(driverIdStr);
        const rideId = req.params.id;
        const ride = yield ride_service_1.RideService.acceptRide(rideId, driverId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Ride accepted successfully',
            data: ride,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || 'Failed to accept ride',
        });
    }
});
const updateRideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // 🛑 Validate if driverId exists
        if (!driverIdStr) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized access - driver ID missing',
            });
        }
        const driverId = new mongoose_1.Types.ObjectId(driverIdStr); // ✅ cast to ObjectId
        const rideId = req.params.id;
        const { status } = req.body;
        const updatedRide = yield ride_service_1.RideService.updateRideStatus(rideId, driverId, status);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'Ride status updated successfully',
            data: updatedRide,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || 'Failed to update ride status',
        });
    }
});
const getAllRidesAdmin = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rides = yield ride_service_1.RideService.getAllRides();
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: 'All rides fetched successfully',
            data: rides,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to fetch rides',
        });
    }
});
exports.RideController = {
    requestRide,
    cancelRide,
    getMyRides,
    acceptRide,
    updateRideStatus,
    getAllRidesAdmin,
};
