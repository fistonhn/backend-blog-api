import Comment from '../models/comment.model';
// import { blogs } from '../controller/blog.controller'


const comments = [];

const createComment = (req, res) => {

    // const blog = blogs.find((blog) => blog.id == req.params.id );

    // if (!blog) return res.status(404).json({ status: 404, error: `There is no blog with id ${req.params.id} ` });

  const id = comments.length + 1;
  const blogId = req.params.id;

  const comment = new Comment(id, blogId, req.body.name, req.body.comment, new Date().toLocaleString());

  comments.push(comment);

  res.status(201).json({ status: 201, message: 'comment successfully created', data: comment });
};


export { createComment };