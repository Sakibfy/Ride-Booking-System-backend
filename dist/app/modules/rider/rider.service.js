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
exports.RiderService = void 0;
const ride_model_1 = require("../ride/ride.model");
exports.RiderService = {
    // ✅ 1. Get ride history
    getRideHistory(riderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield ride_model_1.Ride.find({ rider: riderId }).sort({ createdAt: -1 });
            return rides;
        });
    },
    // ✅ 2. (Optional) Count how many times the rider canceled
    getCancelCount(riderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const canceledRides = yield ride_model_1.Ride.countDocuments({
                rider: riderId,
                status: "cancelled",
            });
            return canceledRides;
        });
    },
};
