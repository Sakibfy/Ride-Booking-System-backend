
import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post("/login", AuthController.login)


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

export const authRoutes = router;
