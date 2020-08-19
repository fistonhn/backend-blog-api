import Joi from '@hapi/joi';

const messageInput = (req) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required().min(2).max(50),
        message: Joi.string().required(),
    });
  
    return schema.validate(req.body);
}

export default messageInput;
