import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.interface";
import { User } from "../user/user.model";
import { Types } from "mongoose";

// ✅ Rider requests a new ride
const requestRide = async (
  riderId: Types.ObjectId,
  pickupLocation: IRide["pickupLocation"],
  destinationLocation: IRide["destinationLocation"]
) => {
  const ride = await Ride.create({
    rider: riderId,
    pickupLocation,
    destinationLocation,
    status: "requested",
    timestamps: { requestedAt: new Date() },
  });
  return ride;
};

// ✅ Rider cancels a ride (only if not accepted yet)
const cancelRide = async (rideId: string, riderId: Types.ObjectId) => {
  const ride = await Ride.findOne({ _id: rideId, rider: riderId });

  if (!ride) throw new Error("Ride not found");

  if (ride.status !== "requested") {
    throw new Error("Cannot cancel ride after it's accepted");
  }

  ride.status = "cancelled";
  // ride.timestamps = { ...ride.timestamps, cancelledAt: new Date() };
  ride.cancelledAt = new Date();
  
  await ride.save();

  return ride;
};

// ✅ Rider or Driver view ride history
const getUserRides = async (userId: Types.ObjectId, role: string) => {
  const filter = role === "rider" ? { rider: userId } : { driver: userId };
  return await Ride.find(filter).sort({ createdAt: -1 });
};

// ✅ Driver accepts ride
const acceptRide = async (rideId: string, driverId: Types.ObjectId) => {
  const driver = await User.findById(driverId);
  


  // if (!driver || !driver.isApproved || driver.isBlocked) {
  //   throw new Error("Driver is not allowed to accept rides");
  // }

  const ongoingRide = await Ride.findOne({ driver: driverId, status: { $in: ["accepted", "in_transit"] } });
  if (ongoingRide) throw new Error("Driver already has an active ride");

  const ride = await Ride.findById(rideId);

  if (!ride) throw new Error("Ride not found");

  if (ride.status !== "requested") {
    throw new Error("This ride is already accepted or cancelled");
  }

  ride.status = "accepted";
  ride.driver = driverId;
  await ride.save();

  return ride;
};

// ✅ Driver updates ride status
const updateRideStatus = async (
  rideId: string,
  driverId: Types.ObjectId,
  newStatus: 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled'
) => {
  const ride = await Ride.findOne({ _id: rideId, driver: driverId });
  if (!ride) throw new Error("Ride not found");

  const validTransitions: Record<
    'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled',
    string[]
  > = {
    requested: ['accepted'],
    accepted: ['picked_up'],
    picked_up: ['in_transit'],
    in_transit: ['completed'],
    completed: [],
    cancelled: [],
  };

  if (!validTransitions[ride.status!]?.includes(newStatus)) {
    throw new Error(`Invalid status transition from ${ride.status} to ${newStatus}`);
  }

  ride.status = newStatus;

  ride.set('timestamps', {
    ...ride.get('timestamps'),
    ...(newStatus === 'picked_up' && { pickedUpAt: new Date() }),
    ...(newStatus === 'completed' && { completedAt: new Date() }),
  });

  await ride.save();
  return ride;
};


// ✅ Admin gets all rides
const getAllRides = async () => {
  return await Ride.find().sort({ createdAt: -1 }).populate("rider driver");
};

export const RideService = {
  requestRide,
  cancelRide,
  getUserRides,
  acceptRide,
  updateRideStatus,
  getAllRides,
};
