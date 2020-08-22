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

const getAllComments = (req, res) => {

    const commentFound = comments.find((comment) =>  comment.blogId == req.params.id );

  
    if (!commentFound) return res.status(404).json({ status: 404, message: 'There are no created comment' });

    console.log(commentFound)
  
    const allComments = comments.sort((a, b) => (new Date(b.createdOn)).getTime()
    - (new Date(a.createdOn).getTime()));
  
    res.status(200).json({ status: 200, data: allComments });
  };
  
  const deleteComment = (req, res) => {
     
    const comment = comments.find((comment) => comment.id == req.params.id );
  
    if (!comment) return res.status(404).json({ status: 404, error: `There is no comment with id ${req.params.id} ` });

  
    const index = comments.indexOf(comment);
  
    comments.splice(index, 1);
  
    return res.status(200).json({ status: 200, message: 'comment successfully deleted' });
  };
  

export { createComment, getAllComments, deleteComment };