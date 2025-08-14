"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderRoutes = void 0;
const rider_controller_1 = require("./rider.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const express_1 = require("express");
const router = (0, express_1.Router)();
// ✅ Rider can view their own ride history
router.get("/ride-history", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), rider_controller_1.RiderController.getRideHistory);
exports.RiderRoutes = router;
