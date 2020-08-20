import express from 'express';
import { validateSignup, validateLogin } from '../middleware/user.validation';
import { signup, login, getAllUsers } from '../controller/user.controller';


const usersRouter = express.Router();

usersRouter.post('/auth/signup', [validateSignup], signup);

usersRouter.post('/auth/signin', [validateLogin], login);

usersRouter.get('/auth/users', getAllUsers);

export default usersRouter;
