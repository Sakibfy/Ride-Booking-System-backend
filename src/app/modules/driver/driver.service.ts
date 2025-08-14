import { Types } from "mongoose";
import { User } from "../user/user.model";
import { Role, IsActive, IUser } from "../user/user.interface";
import { Ride } from "../ride/ride.model";

export const DriverService = {
  
  async getDriverProfile(driverId: Types.ObjectId | string): Promise<Partial<IUser>> {
    const driver = await User.findOne({ _id: driverId, role: Role.DRIVER })
      .select("-password")
      .lean();

    if (!driver) {
      throw new Error("Driver not found");
    }

    return driver;
  },

  
  async getDriverRides(driverId: Types.ObjectId | string) {
    const rides = await Ride.find({ driver: driverId }).sort({ createdAt: -1 }).lean();
    return rides;
  },

  
  async toggleAvailability(driverId: Types.ObjectId | string, isOnline: boolean) {
    const driver = await User.findOneAndUpdate(
      { _id: driverId, role: Role.DRIVER },
      { isOnline },
      { new: true }
    ).select("-password");

    if (!driver) {
      throw new Error("Driver not found");
    }

    return driver;
  },

  
  async getEarnings(driverId: Types.ObjectId | string) {
    const driver = await User.findOne({ _id: driverId, role: Role.DRIVER }).select("totalEarnings").lean();

    if (!driver) {
      throw new Error("Driver not found");
    }

    return {
      totalEarnings: driver.totalEarnings || 0,
    };
  },

  
  async approveDriver(driverId: Types.ObjectId | string) {
    const driver = await User.findOneAndUpdate(
      { _id: driverId, role: Role.DRIVER },
      { isApproved: true },
      { new: true }
    ).select("-password");

    if (!driver) {
      throw new Error("Driver not found");
    }

    return driver;
  },
};
