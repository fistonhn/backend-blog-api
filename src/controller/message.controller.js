import Messages from '../models/message.modal';


const createNewMessage = (req, res) => {

          const message = new Messages({

            email: req.body.email, 
            name: req.body.name, 
            message: req.body.message
            
          });

          message.save()
          .then(result =>{ res.status(201).json({ status: 201, message: 'message created successfully', result }) })

          .catch(error =>{res.status(500).json({ status: 500, error: 'server error', error })})
};

const getAllMessages = (req, res) => {


  
  Messages.find()
  .exec() 
  .then(docs =>{

    if(docs.length > 0 ){

     res.status(200).json({ status: 200, data: docs.reverse() });
    } else {

     res.status(404).json({ status: 404, message: 'There are no available messages' });
    }

    
  }) .catch(error =>{res.status(500).json({ status: 500, error: 'server error', error })})
};

const getOneMessage = (req, res) => {

  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });

  Messages.findById(id)
   .exec() 
   .then(doc =>{

    if (!doc){

      res.status(404).json({ status: 404, message: 'No message found' });
    }else{ 

     res.status(200).json({ status: 200, data: doc }); 

    }

   })
   .catch(error =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', error  }) })

};

const deleteMessage = (req, res) => {


  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });



  Messages.findById(id)
  .exec() 
  .then(doc =>{

   if (!doc){

     res.status(404).json({ status: 404, message: 'No message found' });
   }else{ 

    Messages.deleteOne({_id: id})
    .exec() 
    .then( res.status(200).json({ status: 200, message: 'message successfully deleted' }))
  

   }
  })  .catch(error =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', error }) })

};
  

export { createNewMessage, getAllMessages, getOneMessage, deleteMessage };
