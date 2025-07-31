import { Request, Router, Response, NextFunction } from "express";
import { UserControllers } from './user.controller';
import { checkAuth } from '../../middlewares/auth.middleware';
import { checkRole } from '../../middlewares/role.middleware';
import jwt from "jsonwebtoken"


const router = Router();

// ✅ Register user (public route - optional, might move to auth route)
router.post('/register', UserControllers.createUser);

// ✅ Admin-only routes
router.get('/all-users', (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;

  const verifiedToken = jwt.verify(accessToken as string, "secret")

  console.log(verifiedToken);
  next()
  
}, UserControllers.getAllUsers);





router.get('/:id',   UserControllers.getUserById);
router.patch('/block/:id', checkAuth, checkRole('admin'), UserControllers.blockUser);
router.patch('/unblock/:id', checkAuth, checkRole('admin'), UserControllers.unblockUser);
router.patch('/driver/approve/:id', checkAuth, checkRole('admin'), UserControllers.approveDriver);
router.patch('/driver/suspend/:id', checkAuth, checkRole('admin'), UserControllers.suspendDriver);

// ✅ Driver-only route: update online/offline status
router.patch(
  '/driver/availability',
  checkAuth,
  checkRole('driver'),
  UserControllers.updateDriverAvailability
);

export const UserRoutes = router;
