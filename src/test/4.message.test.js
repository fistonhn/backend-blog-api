import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import messagesTest from '../models/message.test.data';
import usersTest from '../models/user.test.data';
import generateToken from '../helper/generateAuthToken';



const { expect } = chai;
chai.use(chaiHttp);


const adminToken = generateToken(usersTest[10].id,usersTest[10].email, usersTest[10].role);
const unauthToken = generateToken(usersTest[13].id,usersTest[13].email, usersTest[13].role);
const invalidToken = ' ';


// get all messages 

describe('When admin tries to view all messages--- GET messages -- api/messages', () => {

    it('should return No available messages', (done) => {
        chai
          .request(app)
          .get('/api/message')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('No available messages');
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
            expect(res.body.message).to.equal('message successfully created');
            done();
          });
      });

      it('should return message 2 created successfull', (done) => {
        chai
          .request(app)
          .post('/api/message')
          .set('Accept', 'application/json')
          .send(messagesTest[3])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('message successfully created');
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


  // get all spcific message

describe('When admin tries to view specific message--- GET message -- api/messages', () => {

    it('should return specific message', (done) => {
        chai
          .request(app)
          .get('/api/message/1')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should return There is no message with that id', (done) => {
        chai
          .request(app)
          .get('/api/message/5')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
  
  
  });



    // delete message

    describe('When admin tries to delete specific message--- DELETE message -- api/message/1', () => {

        it('should return delete specific message', (done) => {
          chai
            .request(app)
            .delete('/api/message/1')
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
              .delete('/api/message/5')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          });
      
    
      });
    


