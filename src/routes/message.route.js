import express from 'express';
import validateMessageInput  from '../middleware/message.validation';
import { verifyAdminToken } from '../middleware/verifyAuthToken';
import { createNewMessage, getAllMessages  } from '../controller/message.controller';


const messagesRouter = express.Router();


messagesRouter.post('/message', [validateMessageInput], createNewMessage);

messagesRouter.get('/message/', [verifyAdminToken], getAllMessages);




export default messagesRouter;
