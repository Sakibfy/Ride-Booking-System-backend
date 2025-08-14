"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRoutes = void 0;
const ride_controller_1 = require("./ride.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Rider routes
router.post("/request", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.RideController.requestRide);
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.RideController.cancelRide);
router.get("/history", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER, user_interface_1.Role.DRIVER), ride_controller_1.RideController.getMyRides);
// Driver routes
router.patch("/accept/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideController.acceptRide);
router.patch("/status/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.RideController.updateRideStatus);
// Admin route
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), ride_controller_1.RideController.getAllRidesAdmin);
exports.RideRoutes = router;
