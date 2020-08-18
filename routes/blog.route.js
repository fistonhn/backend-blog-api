import express from 'express';
import validateBlogInput  from '../middleware/blog.validation';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { getAllBlogs, createNewBlog, getOneBlog, updateBlog, deleteBlog } from '../controller/blog.controller';


const blogsRouter = express.Router();


blogsRouter.get('/blog/', getAllBlogs);

blogsRouter.post('/blog', [verifyAuthToken, validateBlogInput], createNewBlog);

blogsRouter.get('/blog/:id', getOneBlog);

blogsRouter.patch('/blog/:id', [verifyAuthToken, validateBlogInput], updateBlog);

blogsRouter.delete('/blog/:id', [verifyAuthToken], deleteBlog);

export default blogsRouter;
