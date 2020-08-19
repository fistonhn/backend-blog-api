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



export { createNewMessage };
