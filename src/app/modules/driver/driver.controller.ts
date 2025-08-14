import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { DriverService } from "./driver.service";
import mongoose from "mongoose"; 

const getProfile = async (req: Request, res: Response) => {
  try {
    const driverId = req.user?._id;
    if (!driverId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: Driver ID missing",
      });
    }

    const driver = await DriverService.getDriverProfile(driverId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Driver profile fetched successfully",
      data: driver,
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

const getRides = async (req: Request, res: Response) => {
  try {
    const driverId = req.user?._id;
    if (!driverId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: Driver ID missing",
      });
    }

    const rides = await DriverService.getDriverRides(driverId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Driver ride history fetched successfully",
      data: rides,
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

const toggleAvailability = async (req: Request, res: Response) => {
  try {
    const driverId = req.user?._id;
    const { isOnline } = req.body;
    if (!driverId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: Driver ID missing",
      });
    }

    const driver = await DriverService.toggleAvailability(driverId, isOnline);
    res.status(httpStatus.OK).json({
      success: true,
      message: `Driver is now ${isOnline ? "online" : "offline"}`,
      data: driver,
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

const getEarnings = async (req: Request, res: Response) => {
  try {
    const driverId = req.user?._id;
    if (!driverId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: Driver ID missing",
      });
    }

    const earnings = await DriverService.getEarnings(driverId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Driver earnings fetched",
      data: earnings,
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

export const DriverController = {
  getProfile,
  getRides,
  toggleAvailability,
  getEarnings,
};
