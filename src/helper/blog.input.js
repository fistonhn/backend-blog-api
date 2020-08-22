import Joi from '@hapi/joi';

const blogInput = (req) => {
    const schema = Joi.object().keys({

        title: Joi.string().required().min(3).max(150),
        content: Joi.string().required().min(5),
        author: Joi.string().required(),
    });
  
    return schema.validate(req.body);
  };


const blogUpdateInput = (req) => {
  const schema = Joi.object().keys({
    
      title: Joi.string().optional().min(3).max(150),
      content: Joi.string().optional().min(5),
      author: Joi.string().optional(),
  });

  return schema.validate(req.body);
};
  

export { blogInput, blogUpdateInput };
