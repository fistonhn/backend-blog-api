import { commentInput } from '../helper/comment.input';


const validateComment = (req, res, next) => {
  const { error } = commentInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};


export { validateComment };
