import express from 'express';
import validateMessageInput  from '../middleware/message.validation';
import { createNewMessage  } from '../controller/message.controller';


const messagesRouter = express.Router();


messagesRouter.post('/message', [validateMessageInput], createNewMessage);



export default messagesRouter;
