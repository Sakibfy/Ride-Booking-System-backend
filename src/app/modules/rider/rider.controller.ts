// src/modules/rider/rider.controller.ts

import { Request, Response } from "express";
import { RiderService } from "./rider.service";
import httpStatus from "http-status-codes";

export const RiderController = {
  getRideHistory: async (req: Request, res: Response) => {
    try {
      const riderId = req.user?._id;

      if (!riderId) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized. Rider ID missing.",
        });
      }

      const rides = await RiderService.getRideHistory(riderId);

      res.status(httpStatus.OK).json({
        success: true,
        message: "Rider ride history fetched successfully",
        data: rides,
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  },
};
