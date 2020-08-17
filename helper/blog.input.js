import Joi from '@hapi/joi';

const blogInput = (req) => {
    const schema = Joi.object().keys({
        title: Joi.string().required().min(3).max(150),
        content: Joi.string().required().min(5),
        author: Joi.string().required(),
    });
  
    return Joi.validate(req.body, schema);
  };
  

export default blogInput;
