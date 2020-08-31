import User from '../models/user.model';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';


const signup = (req, res) => {

  const email = req.body.email;
  
  User.find({email : email}, function (err, docs){

  
      if (docs.length > 0){
 
          res.status(409).json({ status: 409, message: 'Email address already taken' });
      }else{ 
          
          let password = req.body.password;

          password = encryptPassword(password);
          const user = new User({

            role: 'guest', 
            name: req.body.name, 
            email: req.body.email, 
            password: password
          });

          const token = generateToken(user.email, user.role);


          user.save().then(result =>{ 
            
            res.status(201).json({ status: 201, message: 'User created successfully', token, result });  
          
          }) .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })


      }
  });


};


const login = (req, res) => {
  const { email, password } = req.body;

  User.find({email : email}, function (err, docs){
       
  
    if (docs.length <= 0){

      res.status(404).send({ status: 404, message: 'No associated account with this email' });
    }else{ 

        
     const isPasswordValid = decryptPassword(password, docs[0].password);
     if (!isPasswordValid) return res.status(401).json({ status: 401, message: 'Incorrect password!' });


     const token = generateToken(docs[0].email, docs[0].role);

     res.status(200).json({ status: 200, message: 'login successfully', data: { token } });



    }
})  .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

};


const getAllUsers = (req, res) => {


  User.find()
   .exec() 
   .then(docs =>{

     if(docs.length > 0 ){

      res.status(200).json({ status: 200, data: docs.reverse() });
     } else {

      res.status(404).json({ status: 404, message: 'No users found' });
     }

     
   }) .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

};


const getSpecificUser = (req, res) => {

  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });

  User.findById(id)
   .exec() 
   .then(doc =>{

    if (!doc){

      res.status(404).json({ status: 404, message: 'No user found' });
    }else{ 

     res.status(200).json({ status: 200, data: doc }); 

    }

   }) .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

};


const updateSpecificUser = (req, res) => {


  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });



  User.findById(id)
  .exec() 
  .then(doc =>{

   if (!doc){

     res.status(404).json({ status: 404, message: 'No user found' });
   }else{ 

    let password = req.body.password;

    password = encryptPassword(password);
  
  
    User.updateOne( 
      
      {_id: id}, 
      { $set: {  "role" : req.body.role,  "name" :  req.body.name,  "email": req.body.email, "password": password },
        $currentDate: { "lastModified": true }  })
    .exec() 
    .then(
   
      res.status(200).json({ status: 200, message: 'user successfully updated', data: doc })   )

   }

  }) .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

}; 


const deleteSpecificUser = (req, res) => {

  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });

  User.findById(id)
   .exec() 
   .then(doc =>{

    if (!doc){

      res.status(404).json({ status: 404, message: 'No user found' });
    }else{ 
    
      User.deleteOne({_id: id})
      .exec() 
      .then( res.status(200).json({ status: 200, message: 'user successfully deleted' }))

    }

   }) .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

};


export { signup, login, getAllUsers, getSpecificUser, updateSpecificUser, deleteSpecificUser };