const { authJwt } = require('../middleware');
const controller = require('../controllers/agenda.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  //todo: Create Agenda - Host mandatory
  app.post(
    '/api/dataCommunity/:id/createAgenda',
    [authJwt.verifyToken, authJwt.isHostCommunity],
    controller.createAgenda
  );

  //todo: Join Agenda

  //? todo: Logging
  app.get('/api/agenda/log', controller.logging);
};
