const { authJwt } = require('../middleware');
const controller = require('../controllers/community.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  // Create community
  app.post(
    '/api/createCommunity',
    [authJwt.verifyToken],
    controller.createCommunity
  );

  // Join community
  app.post(
    '/api/joinCommunity',
    [authJwt.verifyToken, authJwt.isHost],
    controller.joinCommunity
  );

  // Get All Community
  app.get('/api/communities', [authJwt.verifyToken], controller.allCommunities);

  // Get all data community with all members who have been joined community
  app.get(
    '/api/dataCommunity/:id',
    [authJwt.verifyToken],
    controller.dataCommunity
  );

  // todo: Logging
  app.get(
    '/api/log',
    [authJwt.verifyToken, authJwt.isHost],
    controller.logging
  );
};
