"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
// ✅ Register user (public route - optional, might move to auth route)
router.post('/register', user_controller_1.UserControllers.createUser);
// ✅ Admin-only routes
router.get('/all-users', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getAllUsers);
router.get('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getUserById);
router.patch('/block/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.blockUser);
router.patch('/unblock/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.unblockUser);
router.patch('/driver/approve/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.approveDriver);
router.patch('/driver/suspend/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.suspendDriver);
router.patch('/driver/availability', (0, checkAuth_1.checkAuth)(user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.ADMIN), user_controller_1.UserControllers.updateDriverAvailability);
exports.UserRoutes = router;
