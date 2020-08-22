import Blogs from '../models/blog.model';

const blogs = [ ];


const createNewBlog = (req, res) => {

    const email = req.authUser.userEmail;
    const id =  blogs.length + 1;

  const blog = new Blogs(id, email, new Date().toLocaleString(), req.body.title, req.body.content, req.body.author);

  blogs.push(blog);

  res.status(201).json({ status: 201, message: 'blog successfully created', data: blog });
};

const getAllBlogs = (req, res) => {

  const blogFound = blogs.find((blog) => blog );

  if (!blogFound) return res.status(404).json({ status: 404, error: 'There are no created blogs' });

  const allBlogs = blogs.sort((a, b) => (new Date(b.createdOn)).getTime()
  - (new Date(a.createdOn).getTime()));

  res.status(200).json({ status: 200, data: allBlogs });
};

const getOneBlog = (req, res) => {
  const blog = blogs.find((blog) => blog.id == req.params.id );

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  return res.status(200).json({ status: 200, data: blog });
};

const updateBlog = (req, res) => {

  const blog = blogs.find((blog) => blog.id == req.params.id );

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  const authhEmail = req.authUser.userEmail;
  if (blog.email != authhEmail) return res.status(401).send({ status: 401, message: 'You are not authorized to perform this action' });


  let title =  req.body.title;
  let content =  req.body.content;
  let author =  req.body.author;

  if(!title){ title = blog.title; }
  if(!content){ content = blog.content; }
  if(!author){ author =blog.author; }


  blog.title = title;
  blog.content = content;
  blog.author = author;

  return res.status(200).json({ status: 200, message: 'blog successfully updated', data: blog });
};

const deleteBlog = (req, res) => {
     
  const blog = blogs.find((blog) => blog.id == req.params.id );

  if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  
  const authhEmail = req.authUser.userEmail;
  if (blog.email != authhEmail) return res.status(401).send({ status: 401, message: 'You are not authorized to perform this action' });

  const index = blogs.indexOf(blog);

  blogs.splice(index, 1);

  return res.status(200).json({ status: 200, message: 'blog successfully deleted' });
};


export { createNewBlog, getAllBlogs, getOneBlog, updateBlog, deleteBlog };