const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('test request', () => {
  let userId = '';
  before('should return home page', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  beforeEach(done => {
    request(app)
      .post('/user/create')
      .send({
        name: 'test1',
        email: 'test1@example.com',
        password: '123',
        isAdmin: 0,
      })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('userId');
        expect(res.body.name).to.eq('test1');
        expect(res.body.email).to.eq('test1@example.com');
        expect(res.body.password).to.eq('123');
        expect(res.body.isAdmin).to.eq(0);
        userId = res.body.userId;
        done();
      });
  });

  it('update user password', done => {
    request(app)
      .put('/user/update/' + userId)
      .send({ password: '999' })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  afterEach('delete user', done => {
    request(app)
      .delete('/user/delete/' + userId)
      .end((err, res) => {
        expect(res.status).to.eq(500);
        done();
      })
  });
})