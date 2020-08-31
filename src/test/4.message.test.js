import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../index';
import messagesTest from '../models/message.test.data';
import usersTest from '../models/user.test.data';
import generateToken from '../helper/generateAuthToken';
import Messages from '../models/message.modal';



const { expect } = chai;
chai.use(chaiHttp);


const adminToken = generateToken(usersTest[10].email, usersTest[10].role);
const unauthToken = generateToken(usersTest[13].email, usersTest[13].role);
const invalidToken = ' ';


before(async (done) => {  
    await mongoose.connect('mongodb+srv://fistonhn:habimana@cluster0.dazrr.mongodb.net/fistonBlog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, done);
  
  })
  
  before(async () => {  
    await Messages.deleteMany()
  
  });
  


// get all messages 

describe('When admin tries to view all messages--- GET messages -- api/messages', () => {

    it('should return No available messages', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('There are no available messages');
            done();
          });
      });
  
  });


// create message 

describe('When the user create meassage --api/message', () => {
    it('should return Name is required ', (done) => {
      chai
        .request(app)
        .post('/api/message')
        .set('Accept', 'application/json')
        .send(messagesTest[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"name" is required');
          done();
        });
    });

      it('should return message created successfull', (done) => {
        chai
          .request(app)
          .post('/api/message')
          .set('Accept', 'application/json')
          .send(messagesTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('message created successfully');
            done();
          });
      });

})


// get all messages 

describe('When admin tries to view all messages--- GET messages -- api/messages', () => {

    it('should return all messages', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should return Unauthorised - Header Not Set', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal('Unauthorised - Header Not Set');
            done();
          });
      });

      it('should return Unauthorised or Invalid Token', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .set('Authorization', invalidToken)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal('Unauthorised or Invalid Token');
            done();
          });
      });

      it('should return Access denied! you are not an admin', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .set('Authorization', unauthToken)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Access denied! you are not an admin');
            done();
          });
      });
  
  });


  // get spcific message

describe('When admin tries to view specific message--- GET message -- api/messages', () => {

  const message = new Messages({

    email: 'gibzo@gmail.com', 
    name: 'gibzo', 
    message: 'joining andela'
    
  });

  before(async () => { await message.save() });

  const messageId = message.id;



    it('should return specific message', (done) => {
        chai
          .request(app)
          .get(`/api/message/${messageId}`)
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should return There is no message with that id', (done) => {
        chai
          .request(app)
          .get('/api/message/5f483cceb7beb81568148ed9')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });

      it('should return Id must be a single string of 24 bytes', (done) => {
        chai
          .request(app)
          .get('/api/message/45')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.message).to.equal('Id must be a single string of 24 bytes');
            done();
          });
      });
  
  
  });



    // delete message

    describe('When admin tries to delete specific message--- DELETE message -- api/message/1', () => {

      const message = new Messages({

        email: 'gibzo@gmail.com', 
        name: 'gibzo', 
        message: 'joining andela'
        
      });
    
      before(async () => { await message.save() });
    
      const messageId = message.id;
    

        it('should return delete specific message', (done) => {
          chai
            .request(app)
            .delete(`/api/message/${messageId}`)
            .set('Authorization', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('message successfully deleted');
              done();
            });
        });
    
        it('should return the message does not exist', (done) => {
            chai
              .request(app)
              .delete('/api/message/5f483cceb7beb81568148ed9')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          });
      
          it('should return Id must be a single string of 24 bytes', (done) => {
            chai
              .request(app)
              .delete('/api/message/45')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('Id must be a single string of 24 bytes');
                done();
              });
          });
    
      });
    


