import { v4 as uuidv4 } from 'uuid';
import Messages from '../models/message.modal';

uuidv4();

const messages = [ ];


const createNewMessage = (req, res) => {

    const id = uuidv4();

  const message = new Messages(id, new Date().toLocaleString(), req.body.email, req.body.name, req.body.message);

  messages.push(message);

  res.status(201).json({ status: 201, message: 'message successfully created', data: message });
};

const getAllMessages = (req, res) => {

    const messageFound = messages.find((message) => message );
  
    if (!messageFound) return res.status(404).json({ status: 404, error: 'No available messages' });

    const allMessages = messages.sort((a, b) => (new Date(b.createdOn)).getTime()
    - (new Date(a.createdOn).getTime()));
  
    res.status(200).json({ status: 200, data: allMessages });
};

const getOneMessage = (req, res) => {
const message = messages.find((message) => message.id === req.params.id );

if (!message) return res.status(404).json({ status: 404, error: `There is no message with id: ${req.params.id} ` });

return res.status(200).json({ status: 200, data: message });
};
  

export { createNewMessage, getAllMessages, getOneMessage };
