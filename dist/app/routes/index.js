"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const ride_routes_1 = require("../modules/ride/ride.routes");
const rider_routes_1 = require("../modules/rider/rider.routes");
const driver_routes_1 = require("../modules/driver/driver.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes
    },
    {
        path: "/rides",
        route: ride_routes_1.RideRoutes
    },
    {
        path: "/rider",
        route: rider_routes_1.RiderRoutes
    },
    {
        path: "/driver",
        route: driver_routes_1.DriverRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
