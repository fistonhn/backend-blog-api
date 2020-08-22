import express from 'express';
import { validateBlogInput, validateUpdateBlogInput }  from '../middleware/blog.validation';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { createNewBlog, getAllBlogs, getOneBlog, updateBlog, deleteBlog } from '../controller/blog.controller';


const blogsRouter = express.Router();

blogsRouter.post('/blog', [verifyAuthToken, validateBlogInput], createNewBlog);

blogsRouter.get('/blog', getAllBlogs);

blogsRouter.get('/blog/:id', getOneBlog);

blogsRouter.patch('/blog/:id', [verifyAuthToken, validateUpdateBlogInput], updateBlog);

blogsRouter.delete('/blog/:id', [verifyAuthToken], deleteBlog);

export default blogsRouter;
