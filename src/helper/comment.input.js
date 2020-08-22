import Joi from '@hapi/joi';

const commentInput = (req) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(2).max(50),
    comment: Joi.string().required().max(500)
  });

  return schema.validate(req.body);
};


export { commentInput };
