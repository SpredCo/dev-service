const common = require('spred-common');
const httpHelper = require('spred-http-helper');

var addIndex;

function registerRoute (router, addIndexFunc) {
  router.post('/tags', createTag);
  addIndex = addIndexFunc;
}

function createTag (req, res, next) {
  if (req.body.name === undefined || req.body.description === undefined) {
    httpHelper.sendReply(res, httpHelper.error.invalidRequestError());
  } else {
    common.tagModel.createNew(req.body.name, req.body.description, function (err, cTag) {
      if (err) {
        next(err);
      } else {
        indexTag(cTag, function (err) {
          if (err) {
            next(err);
          } else {
            httpHelper.sendReply(res, 201, cTag);
          }
        });
      }
    });
  }
}

function indexTag (cTag, cb) {
  var tag = {
    type: 'tag',
    name: '#' + cTag.name,
    description: cTag.description
  };
  addIndex(['global', 'tag'], [tag], function (err) {
    cb(err);
  });
}
module.exports.registerRoute = registerRoute;
