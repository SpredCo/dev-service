const config = require('config');
const expect = require('chai').expect;
const supertest = require('supertest');
const fixture = require('../fixture/tag.json');

const url = config.get('test.server.url') + ':' + config.get('test.server.port');
const devSrv = supertest(url);

describe('Testing tags route', function () {
  describe('Testing tag creation (POST /v1/tags)', function () {
    it('Should create a new tag', function (done) {
      devSrv
        .post('/v1/tags')
        .send(fixture.tag1)
        .set('Content-Type', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.name).to.equal(fixture.tag1.name);
            expect(res.body.description).to.equal(fixture.tag1.description);
            expect(res.body.id).to.not.be.undefined;
            done();
          }
        });
    });

    it('Should return an error if no parameter are given', function (done) {
      devSrv
        .post('/v1/tags')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.code).to.equal(1);
            expect(res.body.message).to.equal('Invalid request');
            done();
          }
        });
    });
  });
});
