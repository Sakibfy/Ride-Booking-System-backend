
import { RideController } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { Router } from "express";

const router = Router();

// Rider routes
router.post("/request", checkAuth(Role.RIDER), RideController.requestRide);
router.patch("/cancel/:id", checkAuth(Role.RIDER), RideController.cancelRide);
router.get("/history", checkAuth(Role.RIDER, Role.DRIVER), RideController.getMyRides);

// Driver routes
router.patch("/accept/:id", checkAuth(Role.DRIVER), RideController.acceptRide);
router.patch("/status/:id", checkAuth(Role.DRIVER), RideController.updateRideStatus);

// Admin route
router.get("/", checkAuth(Role.ADMIN), RideController.getAllRidesAdmin);

export const RideRoutes = router;
