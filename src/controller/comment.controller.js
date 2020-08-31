import Comment from '../models/comment.model';
import Blog from '../models/blog.model';


const createComment = (req, res) => {


  const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });

  Blog.findById(id)
   .exec() 
   .then(doc =>{

    if (!doc){

      res.status(404).json({ status: 404, message: 'No blog found' });

    }else{ 

      const comment = new Comment({
 
        blogId: doc.id, 
        name:  req.body.name, 
        comment: req.body.comment   
      });

      comment.save().then(result =>{
        
        res.status(201).json({ status: 201, message: 'comment created successfully', result });       
      })
    }

   })
   .catch( result =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', result  })}) 


};

const getAllComments = (req, res) => {

  const id = req.params.id;

  Comment.find({blogId : id}, function (err, docs){
       
  
    if (docs.length <= 0){

      res.status(404).send({ status: 404, message: 'There are no created comment' });
    }else{ 
      
      res.status(200).json({ status: 200, data: docs.reverse() });
    }
})  
.catch( result =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', result  })}) 

};
 
  const deleteComment = (req, res) => {

    const id = req.params.id;
  if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id must be a single string of 24 bytes' });



  Comment.findById(id)
  .exec() 
  .then(doc =>{

   if (!doc){

     res.status(404).json({ status: 404, message: 'No comment  found' });
   }else{ 

    Comment.deleteOne({_id: id})
    .exec() 
    .then( res.status(200).json({ status: 200, message: 'comment successfully deleted' }))
  

   }
  }) .catch( result =>{ res.status(500).json({ status: 500, error: 'something went wrong, check your id first', result  })}) 


  };
  

export { createComment, getAllComments, deleteComment };