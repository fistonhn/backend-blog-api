import { v4 as uuidv4 } from 'uuid';
import Blogs from '../models/blog.model';

uuidv4();

const blogs = [ ];


const createNewBlog = (req, res) => {

    const email = req.authUser.userEmail;
    const id = uuidv4();

  const blog = new Blogs(id, email, new Date().toLocaleString(), req.body.title, req.body.content, req.body.author);

  blogs.push(blog);

  res.status(201).json({ status: 201, message: 'blog successfully created', data: blog });
};

export { createNewBlog };