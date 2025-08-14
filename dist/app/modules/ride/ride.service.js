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
exports.RideService = void 0;
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
// ✅ Rider requests a new ride
const requestRide = (riderId, pickupLocation, destinationLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.create({
        rider: riderId,
        pickupLocation,
        destinationLocation,
        status: "requested",
        timestamps: { requestedAt: new Date() },
    });
    return ride;
});
// ✅ Rider cancels a ride (only if not accepted yet)
const cancelRide = (rideId, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findOne({ _id: rideId, rider: riderId });
    if (!ride)
        throw new Error("Ride not found");
    if (ride.status !== "requested") {
        throw new Error("Cannot cancel ride after it's accepted");
    }
    ride.status = "cancelled";
    // ride.timestamps = { ...ride.timestamps, cancelledAt: new Date() };
    ride.cancelledAt = new Date();
    yield ride.save();
    return ride;
});
// ✅ Rider or Driver view ride history
const getUserRides = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = role === "rider" ? { rider: userId } : { driver: userId };
    return yield ride_model_1.Ride.find(filter).sort({ createdAt: -1 });
});
// ✅ Driver accepts ride
const acceptRide = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findById(driverId);
    // if (!driver || !driver.isApproved || driver.isBlocked) {
    //   throw new Error("Driver is not allowed to accept rides");
    // }
    const ongoingRide = yield ride_model_1.Ride.findOne({ driver: driverId, status: { $in: ["accepted", "in_transit"] } });
    if (ongoingRide)
        throw new Error("Driver already has an active ride");
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new Error("Ride not found");
    if (ride.status !== "requested") {
        throw new Error("This ride is already accepted or cancelled");
    }
    ride.status = "accepted";
    ride.driver = driverId;
    yield ride.save();
    return ride;
});
// ✅ Driver updates ride status
const updateRideStatus = (rideId, driverId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findOne({ _id: rideId, driver: driverId });
    if (!ride)
        throw new Error("Ride not found");
    const validTransitions = {
        requested: ['accepted'],
        accepted: ['picked_up'],
        picked_up: ['in_transit'],
        in_transit: ['completed'],
        completed: [],
        cancelled: [],
    };
    if (!((_a = validTransitions[ride.status]) === null || _a === void 0 ? void 0 : _a.includes(newStatus))) {
        throw new Error(`Invalid status transition from ${ride.status} to ${newStatus}`);
    }
    ride.status = newStatus;
    ride.set('timestamps', Object.assign(Object.assign(Object.assign({}, ride.get('timestamps')), (newStatus === 'picked_up' && { pickedUpAt: new Date() })), (newStatus === 'completed' && { completedAt: new Date() })));
    yield ride.save();
    return ride;
});
// ✅ Admin gets all rides
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find().sort({ createdAt: -1 }).populate("rider driver");
});
exports.RideService = {
    requestRide,
    cancelRide,
    getUserRides,
    acceptRide,
    updateRideStatus,
    getAllRides,
};
