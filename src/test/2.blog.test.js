import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import blogsTest from '../models/blog.test.data';
import usersTest from '../models/user.test.data';

import generateToken from '../helper/generateAuthToken';


const { expect } = chai;
chai.use(chaiHttp);


dotenv.config();
 

const token = generateToken(usersTest[3].id,usersTest[3].email, usersTest[3].role);
const unauthToken = generateToken(usersTest[13].id,usersTest[13].email, usersTest[13].role);
const invalidToken = ' ';



  // get all blogs 

  describe('When users tries to view all blogs--- GET user --api/blogs', () => {

    it('should return the users tries to view all blogs', (done) => {
      chai
        .request(app)
        .get('/api/blog')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('There are no available blogs');
          done();
        });
    });

  });



// create a blog

describe('When the user try to create a blog --api/blog', () => {
    it('should return title is required ', (done) => {
      chai
        .request(app)
        .post('/api/blog')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"title" is required');
          done();
        });
    });


      it('should return blog created successfull', (done) => {
        chai
          .request(app)
          .post('/api/blog')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(blogsTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('blog successfully created');
            done();
          });
      });

      it('should return blog 2 created successfull', (done) => {
        chai
          .request(app)
          .post('/api/blog')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(blogsTest[3])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('blog successfully created');
            done();
          });
      });
})



  // get all users 

  describe('When users tries to view all users--- GET user --api/auth/users', () => {
    it('should return all blogs', (done) => {
        chai
          .request(app)
          .get('/api/blog')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

  });
  

    // get specific blog

    describe('When users tries to view specific blog--- GET blog --/api/blog/1', () => {
        it('should return specific blog', (done) => {
            chai
              .request(app)
              .get('/api/blog/1')
              .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
              });
          });

          it('should return There is no blog with that id', (done) => {
            chai
              .request(app)
              .get('/api/blog/5')
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          });
    
      });


  // update user

  describe('When the user try to update his/her specific blog--- PATCH user,api/blog/id', () => {
    it('should return blog successfull updated ', (done) => {
      chai
        .request(app)
        .patch('/api/blog/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[2])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('blog successfully updated');
          done();
        });
    });

    it('should return blog successfull updated ', (done) => {
      chai
        .request(app)
        .patch('/api/blog/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[4])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('blog successfully updated');
          done();
        });
    });
    it('should return blog successfull updated ', (done) => {
      chai
        .request(app)
        .patch('/api/blog/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[5])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('blog successfully updated');
          done();
        });
    });
    it('should return blog successfull updated ', (done) => {
      chai
        .request(app)
        .patch('/api/blog/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[6])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('blog successfully updated');
          done();
        });
    });

    it('should return blog with  name successfull updated ', (done) => {
      chai
        .request(app)
        .patch('/api/blog/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(blogsTest[7])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('"name" is not allowed');
          done();
        });
    });

    it('should return There is no blog with that id', (done) => {
        chai
          .request(app)
          .patch('/api/blog/5')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(blogsTest[2])
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });

      it('should return Unauthorised user - Header Not Set', (done) => {
        chai
          .request(app)
          .patch('/api/blog/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal('Unauthorised - Header Not Set');
            done();
          });
      });

      it('should return invalid token or expired', (done) => {
        chai
          .request(app)
          .patch('/api/blog/1')
          .set('Accept', 'application/json')
          .set('Authorization', invalidToken)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal('Unauthorised or Invalid Token');
            done();
          });
      });

      it('should return You have not authorized to perform this action', (done) => {
        chai
          .request(app)
          .patch('/api/blog/1')
          .set('Accept', 'application/json')
          .set('Authorization', unauthToken)
          .send(blogsTest[2])
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal(401);
            expect(res.body.message).to.equal('You are not authorized to perform this action');
            done();
          });
      });
  });


    // delete blog

    describe('When the user try to delete a blog user--- DELETE user,api/blog/id', () => {
      it('should return user successfull deleted ', (done) => {
        chai
          .request(app)
          .delete('/api/blog/2')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('blog successfully deleted');
            done();
          });
      });

      it('should return You have not authorized to perform this action', (done) => {
        chai
          .request(app)
          .delete('/api/blog/1')
          .set('Accept', 'application/json')
          .set('Authorization', unauthToken)
          .send(blogsTest[2])
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal(401);
            expect(res.body.message).to.equal('You are not authorized to perform this action');
            done();
          });
      });

      it('should return There is no blog with that id', (done) => {
        chai
          .request(app)
          .delete('/api/blog/5')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(blogsTest[2])
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });