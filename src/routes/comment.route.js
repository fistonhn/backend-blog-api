import express from 'express';
import { validateComment } from '../middleware/comment.validation';
import { verifyAdminToken } from '../middleware/verifyAuthToken';
import { createComment, getAllComments, deleteComment } from '../controller/comment.controller';


const commentRouter = express.Router();

commentRouter.post('/comment/:id', [validateComment], createComment);

commentRouter.get('/all/comment/:id', getAllComments);

commentRouter.delete('/comment/:id', [verifyAdminToken], deleteComment);


export default commentRouter;
