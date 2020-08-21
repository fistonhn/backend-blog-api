import express from 'express';
import { validateSignup, validateLogin, validateUserUpdate } from '../middleware/user.validation';
import { signup, login, getAllUsers, getSpecificUser, updateSpecificUser } from '../controller/user.controller';


const usersRouter = express.Router();

usersRouter.post('/auth/signup', [validateSignup], signup);

usersRouter.post('/auth/signin', [validateLogin], login);

usersRouter.get('/auth/users', getAllUsers);

usersRouter.get('/auth/user/:id', getSpecificUser);

usersRouter.patch('/auth/user/:id', [validateUserUpdate], updateSpecificUser);

export default usersRouter;
