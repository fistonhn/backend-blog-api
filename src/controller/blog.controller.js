import Blog from '../models/blog.model';




const createNewBlog = (req, res) => {


  const email = req.authUser.userEmail;


          const blog = new Blog({

            email: email, 
            title: req.body.title, 
            content: req.body.content, 
            author: req.body.author
            
          });


          blog.save().then(result =>{ 
            
            res.status(201).json({ status: 201, message: 'blog created successfully', result });  
          
          })

          .catch(error =>{ res.status(500).json({ status: 500, error: 'server error', error }) })

};

const getAllBlogs = (req, res) => {

  Blog.find()
  .exec() 
  .then(docs =>{

    if(docs.length > 0 ){

     res.status(200).json({ status: 200, data: docs.reverse() });
    } else {

     res.status(404).json({ status: 404, message: 'There are no available blogs' });
    }

    
  })
  .catch(error =>{ res.status(500).json({ status: 500, error: error }) })


};

const getOneBlog = (req, res) => {

  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });

  Blog.findById(id)
   .exec() 
   .then(doc =>{

    if (!doc){

      res.status(404).json({ status: 404, message: 'No blog found' });
    }else{ 

     res.status(200).json({ status: 200, data: doc }); 

    }

   })
   .catch(error =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', error }) })

};

const updateBlog = (req, res) => {


  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });



  Blog.findById(id)
  .exec() 
  .then(doc =>{

   if (!doc){

     res.status(404).json({ status: 404, message: 'No blog found' });
   }else{            
   
    const authEmail = req.authUser.userEmail;
    if (doc.email != authEmail) return res.status(401).send({ status: 401, message: 'You are not authorized to perform this action' });


    let email =  req.body.email;
    let title =  req.body.title;
    let content =  req.body.content;
    let author =  req.body.author;
  
    if(!email){ email = doc.email; }
    if(!title){ title = doc.title; }
    if(!content){ content = doc.content; }
    if(!author){ author = doc.author; }
  
  
    Blog.updateOne( 
      
      {_id: id}, 
      { $set: {  "email" : email,  "title" : title,  "content": content, "author":  author },
        $currentDate: { "lastModified": true }  })
    .exec() 
    .then( res.status(200).json({ status: 200, message: 'blog successfully updated' }) )

   }

  })  .catch(error =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', error }) })
};

const deleteBlog = (req, res) => {

const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });



  Blog.findById(id)
  .exec() 
  .then(doc =>{

   if (!doc){

     res.status(404).json({ status: 404, message: 'No blog found' });
   }else{ 
   
    const authEmail = req.authUser.userEmail;

    if (doc.email != authEmail) return res.status(401).send({ status: 401, message: 'You are not authorized to perform this action' });

    Blog.deleteOne({_id: id})
    .exec() 
    .then( res.status(200).json({ status: 200, message: 'blog successfully deleted' }))
  

   }
  })   .catch(error =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', error }) })
};


export { createNewBlog, getAllBlogs, getOneBlog, updateBlog, deleteBlog };