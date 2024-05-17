import express from 'express';
import user from '../controllers/user';
import uploadToMemory from '../config/multer';
import validate from '../middlewares/validate';
import authController from '../controllers/auth.controller';

const userRoute = express.Router();

// anyone can access these routes
userRoute.post('/auth/signup', authController.signup);
userRoute.put('/auth/verify', authController.verify);
userRoute.post('/auth/login', authController.login);

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
