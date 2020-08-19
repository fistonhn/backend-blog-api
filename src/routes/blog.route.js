import express from 'express';
import validateBlogInput  from '../middleware/blog.validation';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { createNewBlog, getAllBlogs, getOneBlog } from '../controller/blog.controller';


const blogsRouter = express.Router();

blogsRouter.post('/blog', [verifyAuthToken, validateBlogInput], createNewBlog);

blogsRouter.get('/blog', getAllBlogs);

blogsRouter.get('/blog/:id', getOneBlog);

blogsRouter.patch('/blog/:id', [verifyAuthToken, validateBlogInput], updateBlog);


export default blogsRouter;
