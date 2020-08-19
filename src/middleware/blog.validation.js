import blogInput from '../helper/blog.input';

const validateBlogInput = (req, res, next) => {
  const { error } = blogInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

export default validateBlogInput;
