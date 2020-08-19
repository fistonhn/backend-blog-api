import express from 'express';
import validateBlogInput  from '../middleware/blog.validation';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { createNewBlog } from '../controller/blog.controller';


const blogsRouter = express.Router();

blogsRouter.post('/blog', [verifyAuthToken, validateBlogInput], createNewBlog);


export default blogsRouter;
