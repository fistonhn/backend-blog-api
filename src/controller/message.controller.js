import Messages from '../models/message.modal';


const messages = [ ];


const createNewMessage = (req, res) => {

  const id =  messages.length + 1;

  const message = new Messages(id, new Date().toLocaleString(), req.body.email, req.body.name, req.body.message);

  messages.push(message);

  res.status(201).json({ status: 201, message: 'message successfully created', data: message });
};

const getAllMessages = (req, res) => {

    const messageFound = messages.find((message) => message );
  
    if (!messageFound) return res.status(404).json({ status: 404, message: 'No available messages' });

    const allMessages = messages.sort((a, b) => (new Date(b.createdOn)).getTime()
    - (new Date(a.createdOn).getTime()));
  
    res.status(200).json({ status: 200, data: allMessages });
};

const getOneMessage = (req, res) => {
const message = messages.find((message) => message.id == req.params.id );

if (!message) return res.status(404).json({ status: 404, error: `There is no message with id: ${req.params.id} ` });

return res.status(200).json({ status: 200, data: message });
};

const deleteMessage = (req, res) => {
     
    const message = messages.find((message) => message.id == req.params.id );
  
    if (!message) return res.status(404).json({ status: 404, error: `There is no message with id: ${req.params.id} ` });
  
    const index = messages.indexOf(message);
  
    messages.splice(index, 1);
  
    return res.status(200).json({ status: 200, message: 'message successfully deleted' });
};
  

export { createNewMessage, getAllMessages, getOneMessage, deleteMessage };
