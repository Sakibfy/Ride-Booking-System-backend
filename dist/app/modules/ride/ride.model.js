"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const RideSchema = new mongoose_1.Schema({
    pickupLocation: {
        lat: Number,
        lng: Number,
    },
    destinationLocation: {
        lat: Number,
        lng: Number,
    },
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["requested", "accepted", "picked_up", "in_transit", "completed", "cancelled"],
        default: "requested",
    },
    timestamps: {
        pickedUpAt: Date,
        completedAt: Date,
        cancelledAt: Date, // ✅ Add this here if you prefer to store inside "timestamps"
    },
    cancelledAt: {
        type: Date, // ✅ OR add this if you want to store it separately
    },
}, {
    timestamps: true,
});
exports.Ride = (0, mongoose_1.model)("Ride", RideSchema);
