const config = require('config');
const expect = require('chai').expect;
const supertest = require('supertest');
const common = require('spred-common');
const fixture = require('../fixture/user.json');

const url = config.get('test.server.url') + ':' + config.get('test.server.port');
const devSrv = supertest(url);

var user;

describe('Testing user routes', function () {
  before(function (done) {
    common.userModel.createPassword(fixture.user.email, fixture.user.password,
    fixture.user.pseudo, fixture.user.first_name, fixture.user.last_name, function (err, cUser) {
        if (err) {
          done(err);
        } else {
          user = cUser;
          done();
        }
      });
  });
  
  describe('Testing user deletion (DELETE /v1/users/{email}', function () {
    it('Should delete an user', function (done) {
      devSrv
        .delete('/v1/users/' + user.email)
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
    
    it('Should reply an error when email does not exists', function (done) {
      devSrv
        .delete('/v1/users/fezfze')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});