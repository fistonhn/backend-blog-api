import express from 'express';
import { validateComment } from '../middleware/comment.validation';
import { createComment, getAllComments } from '../controller/comment.controller';


const commentRouter = express.Router();

commentRouter.post('/comment/:id', [validateComment], createComment);

commentRouter.get('/all/comment/:id', getAllComments);


export default commentRouter;
