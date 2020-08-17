import { v4 as uuidv4 } from 'uuid';
import Blogs from '../models/blog.model';

uuidv4();

const blogs = [ ];

const getAllBlogs = (req, res) => {
    console.log(blogs)
  const blogFound = blogs.find((blog) => blog);

  if (!blogFound) return res.status(404).json({ status: 404, error: 'There are no created blogs' });

  const blogs = blogs.sort((a, b) => (new Date(b.createdOn)).getTime()
  - (new Date(a.createdOn).getTime()));

  res.status(200).json({ status: 200, data: blogs });
};

const createNewBlog = (req, res) => {
  const id = uuidv4();
  const blog = new Blogs(id, new Date().toLocaleString(), req.body.title, req.body.content, req.body.author);

  blogs.push(blog);

  res.status(201).json({ status: 201, message: 'blog successfully created', data: blog });
};

const getOneBlog = (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id, 10));

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  return res.status(200).json({ status: 200, data: blog });
};

const updateBlog = (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id, 10));

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.author = req.body.author;

  return res.status(200).json({ status: 200, message: 'blog successfully updated', data: blog });
};

const deleteBlog = (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id, 10));

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  const index = blogs.indexOf(blog);

  blogs.splice(index, 1);

  return res.status(200).json({ status: 200, message: 'blog successfully deleted' });
};


export { getAllBlogs, createNewBlog, getOneBlog, updateBlog, deleteBlog };
