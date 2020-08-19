import Joi from '@hapi/joi';

const messageInput = (req) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required().min(2).max(50),
        message: Joi.string().required(),
    });
  
    return Joi.validate(req.body, schema);
  };
  

export default messageInput;
