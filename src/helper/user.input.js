import Joi from '@hapi/joi';

const signupInput = (req) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
    role: Joi.string().optional()
  });

  return schema.validate(req.body);
};

const loginInput = (req) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
  });

  return schema.validate(req.body);
};

export { signupInput, loginInput };
