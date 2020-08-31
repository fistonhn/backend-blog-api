import chai from 'chai';
import chaiHttp from 'chai-http';

import mongoose from 'mongoose';
import app from '../../index';
import commentsTest from '../models/comment.test.data';
import usersTest from '../models/user.test.data';
import generateToken from '../helper/generateAuthToken';
import Blog from '../models/blog.model';
import Comment from '../models/comment.model';



const { expect } = chai;
chai.use(chaiHttp);


const adminToken = generateToken(usersTest[10].email, usersTest[10].role);
const token = generateToken(usersTest[3].email, usersTest[3].role);


before(async (done) => {  
    await mongoose.connect('mongodb+srv://fistonhn:habimana@cluster0.dazrr.mongodb.net/fistonBlog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, done);
  
  })
  
  before(async () => {  
    await Comment.deleteMany()
  
  });
  


// user create comment 

describe('When the user commenting --api/auth/signup', () => {

    const blog = new Blog({

        email: 'fiston@gmail.com',
        title: 'urugamba rwinkundura', 
        content: 'urugamba rwinkundura urugamba rwinkundura urugamba rwinkundura', 
        author: 'Josua'
      });
    
      before(async () => { await blog.save() });
    
      const blogId = blog.id;
    
    


    it('should return Name is required ', (done) => {
      chai
        .request(app)
        .post(`/api/comment/${blogId}`)
        .set('Accept', 'application/json')
        .send(commentsTest[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"name" is required');
          done();
        });
    });

      it('should return comment created successfull', (done) => {
        chai
          .request(app)
          .post(`/api/comment/${blogId}`)
          .set('Accept', 'application/json')
          .send(commentsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('comment created successfully');
            done();
          });
      });

      it('should return There is no blog with that id', (done) => {
        chai
          .request(app)
          .post('/api/comment/5f483cceb7beb81568148ed9')
          .set('Accept', 'application/json')
          .send(commentsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal(404);
            done();
          });
      });

      
      it('should return Id must be a single string of 24 bytes', (done) => {
        chai
          .request(app)
          .post('/api/comment/66')
          .send(commentsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal(400);
            done();
          });
      });

})


  // get all comments 

  describe('When user tries to view all comments--- GET comment -- api/all/comment/1', () => {

    const blog = new Blog({

        email: 'fiston@gmail.com',
        title: 'urugamba rwinkundura', 
        content: 'urugamba rwinkundura urugamba rwinkundura urugamba rwinkundura', 
        author: 'Josua'
      });
    
      before(async () => { await blog.save() });
    
      const blogId = blog.id;


      const comment = new Comment({
 
        blogId: blogId, 
        name:  'hn fiston', 
        comment: 'uyumunsi nagiye gisenyi'  
      });

      before(async () => { await comment.save() });


    it('should return gets all comments', (done) => {
      chai
        .request(app)
        .get(`/api/all/comment/${blogId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return the comments does not exist', (done) => {
        chai
          .request(app)
          .get('/api/all/comment/5f483cceb7beb81568148ed9')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('There are no created comment');
            done();
          });
      });
  
  });


    // delete comment

    describe('When admin tries to delete specific comments--- DELETE comment -- api/all/comment/1', () => {

        const blog = new Blog({

            email: 'fiston@gmail.com',
            title: 'urugamba rwinkundura', 
            content: 'urugamba rwinkundura urugamba rwinkundura urugamba rwinkundura', 
            author: 'Josua'
          });
        
          before(async () => { await blog.save() });
        
          const blogId = blog.id;
    
    
          const comment = new Comment({
     
            blogId: blogId, 
            name:  'hn fiston', 
            comment: 'uyumunsi nagiye gisenyi'  
          });
    
          before(async () => { await comment.save() });
    
          const commentId = comment.id

        it('should return Id must be a single string of 24 bytes', (done) => {
            chai
              .request(app)
              .delete('/api/comment/66')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('Id must be a single string of 24 bytes');
                done();
              });
          });

          it('should return you are not an admin', (done) => {
            chai
              .request(app)
              .delete(`/api/comment/${commentId}`)
              .set('Authorization', token)
              .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).to.equal('Access denied! you are not an admin');
                done();
              });
          });
      

        it('should return comment successfully deleted', (done) => {
          chai
            .request(app)
            .delete(`/api/comment/${commentId}`)
            .set('Authorization', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('comment successfully deleted');
              done();
            });
        });
    
        it('should return the comments does not exist', (done) => {
            chai
              .request(app)
              .delete('/api/comment/5f483cceb7beb81568148ed9')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          });
      
    
      });
    


