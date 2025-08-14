
import { RiderController } from "./rider.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { Router } from "express";

const router = Router();

// ✅ Rider can view their own ride history
router.get(
  "/ride-history",
  checkAuth(Role.RIDER),
  RiderController.getRideHistory
);

export const RiderRoutes = router;
