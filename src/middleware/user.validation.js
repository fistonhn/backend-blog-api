import { signupInput, loginInput, userUpdateInput } from '../helper/user.input';


const validateSignup = (req, res, next) => {
  const { error } = signupInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

const validateUserUpdate = (req, res, next) => {
  const { error } = userUpdateInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};



export { validateSignup, validateLogin, validateUserUpdate };
