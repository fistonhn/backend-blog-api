import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import commentsTest from '../models/comment.test.data';
import usersTest from '../models/user.test.data';
import generateToken from '../helper/generateAuthToken';



const { expect } = chai;
chai.use(chaiHttp);


const adminToken = generateToken(usersTest[10].id,usersTest[10].email, usersTest[10].role);


// user create comment 

describe('When the user commenting --api/auth/signup', () => {
    it('should return Name is required ', (done) => {
      chai
        .request(app)
        .post('/api/comment/1')
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
          .post('/api/comment/1')
          .set('Accept', 'application/json')
          .send(commentsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('comment successfully created');
            done();
          });
      });

      it('should return There is no blog with that id', (done) => {
        chai
          .request(app)
          .post('/api/comment/5')
          .set('Accept', 'application/json')
          .send(commentsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal(404);
            done();
          });

      });

})


  // get all comments 

  describe('When comments tries to view all comments--- GET comment -- api/all/comment/1', () => {

    it('should return gets all comments', (done) => {
      chai
        .request(app)
        .get('/api/all/comment/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return the comments does not exist', (done) => {
        chai
          .request(app)
          .get('/api/all/comment/5')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('There are no created comment');
            done();
          });
      });
  
  });


    // delete comment

    describe('When admin tries to delete specific comments--- DELETE comment -- api/all/comment/1', () => {

        it('should return gets all comments', (done) => {
          chai
            .request(app)
            .delete('/api/comment/1')
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
              .delete('/api/comment/5')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          });
      
    
      });
    


