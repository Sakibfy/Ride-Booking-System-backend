import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";

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
  // {
  //   path: "/ride",
  //   route: RideRoutes
  // },
  // {
  //   path: "/rider",
  //   route: RiderRoutes
  // },
  // {
  //   path: "/driver",
  //   route: DriverRoutes
  // },
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})