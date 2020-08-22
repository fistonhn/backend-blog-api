import express from 'express';
import { validateComment } from '../middleware/comment.validation';
import { createComment } from '../controller/comment.controller';


const commentRouter = express.Router();

commentRouter.post('/comment/:id', [validateComment], createComment);


export default commentRouter;
