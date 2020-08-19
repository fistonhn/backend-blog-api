import messageInput from '../helper/message.input';

const validateMessageInput = (req, res, next) => {
  const { error } = messageInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

export default validateMessageInput;
