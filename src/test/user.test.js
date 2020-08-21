import dotenv from 'dotenv';
// import { v4 as uuidv4 } from 'uuid';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import usersTest from '../models/user.test.data';
import generateToken from '../helper/generateAuthToken';
// import User from '../models/user.model';



const { expect } = chai;
chai.use(chaiHttp);

// uuidv4(); 
dotenv.config();


// const id = uuidv4();
// const user = new User(id, usersTest[3].role, usersTest[3].name, usersTest[3].email, usersTest[3].password);
 

const token = generateToken(usersTest[3].id,usersTest[3].email, usersTest[3].role);





describe('when user try to visit my app ', () => {
  it('should return welcome to my app ', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.status).to.equal(200);
        done();
      });
  });
});



  // get all users 

  describe('When users tries to view all users--- GET user --api/auth/users', () => {

    it('should return the users does not exist', (done) => {
      chai
        .request(app)
        .get('/api/auth/users')
        .set('Authorization', token)
        .end((err, res) => {
          console.log(res.data)
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('There are no available users');
          done();
        });
    });

  });



// user sign up

describe('When the user try to signup --api/auth/signup', () => {
    it('should return Name is required ', (done) => {
      chai
        .request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(usersTest[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"name" is required');
          done();
        });
    });

    it('should return invalid email ', (done) => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .set('Accept', 'application/json')
          .send(usersTest[1])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"email" must be a valid email');
            done();
          });
      });

      it('should return password must be 6 long string', (done) => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .set('Accept', 'application/json')
          .send(usersTest[2])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"password" length must be at least 6 characters long');
            done();
          });
      });

      it('should return user created successfull', (done) => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .set('Accept', 'application/json')
          .send(usersTest[3])
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body.message).to.equal('User created successfully');
            expect(res.body.data).to.have.property('token');
            done();
          });

          it('should return Email already taken', (done) => {
            chai
              .request(app)
              .post('/api/auth/signup')
              .set('Accept', 'application/json')
              .send(usersTest[4])
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(409);
                expect(res.body.message).to.equal('Email address already taken');
                done();
              });
          });
      });
})


                // when user try to login 

describe(' When the user try to login --api/auth/signin', () => {
    it('should return email is required!', (done) => {
      chai
        .request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send(usersTest[5])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"email" is required');
          done();
        });
    });
    it('should return password must be string!', (done) => {
      chai
        .request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send(usersTest[6])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"password" must be a string');
          done();
        });
    });
    it('should return No associated account with this email!', (done) => {
      chai
        .request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send(usersTest[7])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(404);
          expect(res.body.status).to.equal(404);
          expect(res.body.message).to.equal('No associated account with this email');
          done();
        });
    });
    it('should return Incorrect password!', (done) => {
      chai
        .request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send(usersTest[8])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.status).to.equal(401);
          expect(res.body.message).to.equal('Incorrect password!');
          done();
        });
    });
    it('should user loggin successfull', (done) => {
      chai
        .request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send(usersTest[9])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.message).to.equal('loggin successfull');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });


  
  // create admin user 

  describe('When you create admin user --api/auth/signup', () => {
    it('should return admin created successfull', (done) => {
      chai
        .request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(usersTest[10])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.message).to.equal('User created successfully');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });



  // get all users 

  describe('When users tries to view all users--- GET user --api/auth/users', () => {
    it('should return display all users', (done) => {
      chai
        .request(app)
        .get('/api/auth/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          done();
        });
    });

  });
  

  // admin view specific user

  describe('When the admin try to view a specific user--- GET user,api/user/id', () => {
    it('should return user not found ', (done) => {
      chai
        .request(app)
        .get('/api/auth/user/45')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal(404);
          expect(res.body.message).to.equal('No user found');
          done();
        });
    });
    it('should return selected user', (done) => {
      chai
        .request(app)
        .get('/api/auth/user/1')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
