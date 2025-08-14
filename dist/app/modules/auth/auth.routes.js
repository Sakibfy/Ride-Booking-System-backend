"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.login);
// 🔹 Google Login Route
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// // 🔹 Google Callback Route
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/dashboard'); // or return token for SPA
//   }
// );
exports.authRoutes = router;
