import express from 'express';
import { verifyAdminToken } from '../middleware/verifyAuthToken';
import { validateSignup, validateLogin, validateUserUpdate } from '../middleware/user.validation';
import { signup, login, getAllUsers, getSpecificUser, updateSpecificUser, deleteSpecificUser } from '../controller/user.controller';


const usersRouter = express.Router();

usersRouter.post('/auth/signup', [validateSignup], signup);

usersRouter.post('/auth/signin', [validateLogin], login);

usersRouter.get('/auth/users', [verifyAdminToken], getAllUsers);

usersRouter.get('/auth/user/:id', [verifyAdminToken], getSpecificUser);

usersRouter.patch('/auth/user/:id', [verifyAdminToken, validateUserUpdate], updateSpecificUser);

usersRouter.delete('/auth/user/:id', [verifyAdminToken], deleteSpecificUser);

export default usersRouter;
