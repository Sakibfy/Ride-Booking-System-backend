import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";
import { RideRoutes } from "../modules/ride/ride.routes";
import { RiderRoutes } from "../modules/rider/rider.routes";
import { DriverRoutes } from "../modules/driver/driver.routes";

export const router = Router()

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes
  },
  {
    path: "/auth",
    route: authRoutes
  },
  {
    path: "/rides",
    route: RideRoutes
  },
  {
    path: "/rider",
    route: RiderRoutes
  },
  {
    path: "/driver",
    route: DriverRoutes
  },
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})