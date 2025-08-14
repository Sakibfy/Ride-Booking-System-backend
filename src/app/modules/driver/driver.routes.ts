import express from "express";
import { DriverController } from "./driver.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

// 🔐 All routes are protected and require "driver" role

router.get("/profile", checkAuth(Role.DRIVER), DriverController.getProfile);
router.get("/rides", checkAuth(Role.DRIVER), DriverController.getRides);
router.get("/earnings", checkAuth(Role.DRIVER), DriverController.getEarnings);
router.patch("/availability", checkAuth(Role.DRIVER), DriverController.toggleAvailability);

export const DriverRoutes = router;
