import express from 'express';
import { validateSignup } from '../middleware/user.validation';
import { signup } from '../controller/user.controller';


const usersRouter = express.Router();

usersRouter.post('/auth/signup', [validateSignup], signup);

export default usersRouter;
