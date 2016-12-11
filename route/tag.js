const common = require('spred-common');
const httpHelper = require('spred-http-helper');

function registerRoute (router) {
  router.post('/tags', createTag);
}

function createTag (req, res, next) {
  if (req.body.name === undefined || req.body.description === undefined) {
    httpHelper.sendReply(res, httpHelper.error.invalidRequestError());
  } else {
    common.tagModel.createNew(req.body.name, req.body.description, function (err, cTag) {
      if (err) {
        next(err);
      } else {
        httpHelper.sendReply(res, 201, cTag);
      }
    });
  }
}

module.exports.registerRoute = registerRoute;
