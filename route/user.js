const common = require('spred-common');
const httpHelper = require('spred-http-helper');


function registerRoute(router) {
  router.delete('/users/:email', deleteUser);
}

function deleteUser(req, res, next) {
  common.userModel.getByEmail(req.params.email, function (err, fUser) {
    if (err || fUser == null) {
      httpHelper.sendReply(res, httpHelper.error.userNotFound());
    } else {
      fUser.remove(function (err) {
        if (err) {
          next(err);
        } else {
          httpHelper.sendReply(res, 200, { 'result': 'ok'});
        }
      })
    }
  });
}

module.exports.registerRoute = registerRoute;
