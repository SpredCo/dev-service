const config = require('config');
const expect = require('chai').expect;
const supertest = require('supertest');
const fixture = require('../fixture/client.json');

const url = config.get('test.server.url') + ':' + config.get('test.server.port');
const devSrv = supertest(url);

describe('Testing client routes', function () {
  describe('Testing client creation (POST /v1/clients)', function () {
    it('Should create a new client', function (done) {
      devSrv
        .post('/v1/clients')
        .send(fixture.client1)
        .set('Content-Type', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.name).to.equal(fixture.client1.name);
            expect(res.body.key).to.not.be.undefined;
            expect(res.body.secret).to.not.be.undefined;
            expect(res.body.created_at).to.not.be.undefined;
            expect(res.body._id).to.be.undefined;
            expect(res.body.__v).to.be.undefined;
            expect(res.body.trusted).to.be.true;
            done();
          }
        });
    });

    it('Should reply error when trying to create the same client', function (done) {
      devSrv
        .post('/v1/clients')
        .send(fixture.client1)
        .set('Content-Type', 'application/json')
        .expect(403)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.not.be.undefined;
            expect(res.body.code).to.equal(1);
            expect(res.body.sub_code).to.equal(1);
            expect(res.body.message).to.equal('Client exists');
            done();
          }
        });
    });
  });

  describe('Testing client listing (GET /v1/clients)', function () {
    it('Should list all created client', function (done) {
      devSrv
        .get('/v1/clients')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].name).to.equal(fixture.client1.name);
            expect(res.body[0].key).to.not.be.undefined;
            expect(res.body[0].secret).to.not.be.undefined;
            expect(res.body[0].created_at).to.not.be.undefined;
            expect(res.body[0]._id).to.be.undefined;
            expect(res.body[0].__v).to.be.undefined;
            expect(res.body[0].trusted).to.be.true;
            done();
          }
        });
    });
  });
});
