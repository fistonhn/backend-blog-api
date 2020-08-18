import express from 'express';
import validateMessageInput  from '../middleware/message.validation';
import { verifyAdminToken } from '../middleware/verifyAuthToken';
import { getAllMessages, createNewMessage, getOneMessage, deleteMessage } from '../controller/message.controller';


const messagesRouter = express.Router();



messagesRouter.post('/message', [validateMessageInput], createNewMessage);

messagesRouter.get('/message/', [verifyAdminToken], getAllMessages);

messagesRouter.get('/message/:id', [verifyAdminToken], getOneMessage);

messagesRouter.delete('/message/:id', [verifyAdminToken], deleteMessage);

export default messagesRouter;
