const devApp = require('./');
const config = require('config');
const logger = require('winston');
const mongoose = require('mongoose');

mongoose.connection.on('error', function (err) {
  logger.error('Unable to connect to the database ...');
  logger.error(err);
  process.exit(1);
});

mongoose.connection.on('open', function () {
  logger.info('Connection success !');

  const app = devApp.getApp(true, fakeIndex);
  app.listen(config.get('server.port'), function () {
    logger.info('Server started on port ' + config.get('server.port'));
  });
});

const connectionStr = 'mongodb://' + config.get('dbConfig.host') + ':' +
  config.get('dbConfig.port') + '/' +
  config.get('dbConfig.dbName');

logger.info('Starting dev service ...');
mongoose.connect(connectionStr);

function fakeIndex(indexes, objs, cb) {
  console.log('Indexing on ' + indexes);
  console.log('Obj:' + objs);
  cb(null);
}