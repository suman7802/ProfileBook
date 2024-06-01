import user from '../controllers/user';
import { NODE_ENV } from '../config/keys';
import ratelimitter from 'express-rate-limit';
import uploadToMemory from '../config/multer';
import validate from '../middlewares/validate';
import authController from '../controllers/auth.controller';
import express, { NextFunction, Request, Response } from 'express';

const userRoute = express.Router();

const authLimiter =
  NODE_ENV === 'test'
    ? (req: Request, res: Response, next: NextFunction) => next()
    : ratelimitter({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 5,
      });

// anyone can access these routes
userRoute.post('/auth/signup', authLimiter, authController.signup);
userRoute.put('/auth/verify', authLimiter, authController.verify);
userRoute.post('/auth/login', authLimiter, authController.login);

// only authenticated users can access these routes
userRoute.use(validate.cookie);

userRoute.get('/profile', user.profile);
userRoute.delete('/profile/delete', user.deleteProfile);
userRoute.put('/profile/update', uploadToMemory.single('profile'), user.updateProfile);

// only admin can access these routes
userRoute.use(validate.admin);

userRoute.get('/profiles/:index', user.getUsers);
userRoute.delete('/profile/delete/:id', user.deleteProfileById);

export default userRoute;
