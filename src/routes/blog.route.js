import express from 'express';
import validateBlogInput  from '../middleware/blog.validation';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { createNewBlog, getAllBlogs } from '../controller/blog.controller';


const blogsRouter = express.Router();

blogsRouter.post('/blog', [verifyAuthToken, validateBlogInput], createNewBlog);

blogsRouter.get('/blog', getAllBlogs);


export default blogsRouter;
