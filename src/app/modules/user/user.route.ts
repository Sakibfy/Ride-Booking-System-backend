import { Router } from "express";
import { UserControllers } from './user.controller';
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// ✅ Register user (public route - optional, might move to auth route)
router.post('/register', UserControllers.createUser);

// ✅ Admin-only routes
router.get('/all-users', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.getAllUsers);

router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe)


router.get('/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.getUserById);

router.patch('/block/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.blockUser);

router.patch('/unblock/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.unblockUser);

router.patch('/driver/approve/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.approveDriver);

router.patch('/driver/suspend/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), UserControllers.suspendDriver);

router.patch('/driver/availability', checkAuth(Role.SUPER_ADMIN,Role.ADMIN),UserControllers.updateDriverAvailability);

export const UserRoutes = router;
