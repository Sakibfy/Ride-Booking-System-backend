
import { Ride } from "../ride/ride.model";

export const RiderService = {
  // ✅ 1. Get ride history
  async getRideHistory(riderId: string) {
    const rides = await Ride.find({ rider: riderId }).sort({ createdAt: -1 });

    

    return rides;
  },

  // ✅ 2. (Optional) Count how many times the rider canceled
  async getCancelCount(riderId: string) {
    const canceledRides = await Ride.countDocuments({
      rider: riderId,
      status: "cancelled",
    });
    return canceledRides;
  },
};
