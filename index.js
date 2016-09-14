const path = require('path');
const express = require('express');
const logger = require('winston');
const bodyParser = require('body-parser');
const httpHelper = require('spred-http-helper');

const client = require('./route/client');
const user = require('./route/user');

var devApp = null;
var devRouter = null;

function getApp (log) {
  logger.info('Initializing dev app ...');
  devApp = express();
  devApp.use(bodyParser.json());

  devRouter = express.Router();

  if (log) {
    devRouter.use(httpHelper.requestLogger('dev'));
  }

  // Register all routes
  client.registerRoute(devRouter);
  user.registerRoute(devRouter);

  devApp.use('/v1', devRouter);
  devApp.use('/doc', express.static(path.join(__dirname, '/doc'), {dotfiles: 'allow'}));

  // Error handler
  devApp.use(function (err, req, res, next) {
    logger.log(err);
    logger.error(err);
    httpHelper.sendReply(res, httpHelper.error.internalServerError(err));
  });

  logger.info('Dev app initialized');

  return devApp;
}

module.exports.getApp = getApp;
