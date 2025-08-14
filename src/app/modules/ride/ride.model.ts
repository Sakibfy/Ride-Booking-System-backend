import { Schema, model } from "mongoose";

const RideSchema = new Schema(
  {
    pickupLocation: {
      lat: Number,
      lng: Number,
    },
    destinationLocation: {
      lat: Number,
      lng: Number,
    },
    rider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const Ride = model("Ride", RideSchema);
