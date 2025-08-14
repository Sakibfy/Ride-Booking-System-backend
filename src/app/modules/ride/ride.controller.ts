import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { RideService } from './ride.service';
import mongoose, { Types } from 'mongoose';

const requestRide = async (req: Request, res: Response) => {
  try {
    const riderIdStr = req.user?._id;

    if (!riderIdStr) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: Rider ID missing',
      });
    }

    const riderId = new mongoose.Types.ObjectId(riderIdStr);
    const { pickupLocation, destinationLocation } = req.body;

    const ride = await RideService.requestRide(riderId, pickupLocation, destinationLocation);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Ride requested successfully',
      data: ride,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to request ride',
    });
  }
};

const cancelRide = async (req: Request, res: Response) => {
  try {
    const riderIdStr = req.user?._id;
    if (!riderIdStr) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: Rider ID missing',
      });
    }

    const riderId = new mongoose.Types.ObjectId(riderIdStr);
    const rideId = req.params.id;

    const result = await RideService.cancelRide(rideId, riderId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Ride cancelled successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to cancel ride',
    });
  }
};

const getMyRides = async (req: Request, res: Response) => {
  try {
    const userIdStr = req.user?._id;
    const role = req.user?.role;

    if (!userIdStr) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: User ID missing',
      });
    }

    const userId = new mongoose.Types.ObjectId(userIdStr);

    const rides = await RideService.getUserRides(userId, role as string);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Ride history fetched successfully',
      data: rides,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to fetch rides',
    });
  }
};

const acceptRide = async (req: Request, res: Response) => {
  try {
    const driverIdStr = req.user?._id;
    if (!driverIdStr) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized: Driver ID missing',
      });
    }

    const driverId = new mongoose.Types.ObjectId(driverIdStr);
    const rideId = req.params.id;

    const ride = await RideService.acceptRide(rideId, driverId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Ride accepted successfully',
      data: ride,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to accept ride',
    });
  }
};


const updateRideStatus = async (req: Request, res: Response) => {
  try {
    const driverIdStr = req.user?._id;

    // 🛑 Validate if driverId exists
    if (!driverIdStr) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized access - driver ID missing',
      });
    }

    const driverId = new Types.ObjectId(driverIdStr); // ✅ cast to ObjectId
    const rideId = req.params.id;
    const { status } = req.body;

    const updatedRide = await RideService.updateRideStatus(rideId, driverId, status);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Ride status updated successfully',
      data: updatedRide,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Failed to update ride status',
    });
  }
};


const getAllRidesAdmin = async (_req: Request, res: Response) => {
  try {
    const rides = await RideService.getAllRides();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'All rides fetched successfully',
      data: rides,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch rides',
    });
  }
};

export const RideController = {
  requestRide,
  cancelRide,
  getMyRides,
  acceptRide,
  updateRideStatus,
  getAllRidesAdmin,
};
