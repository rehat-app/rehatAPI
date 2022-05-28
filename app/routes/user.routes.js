const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  // To access public content, no verify JWT
  app.get('/api/test/all', controller.allAccess);

  // To access user content
  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  //? For Admin (optional)
  // app.get(
  //   '/api/test/admin',
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );

  // GET Data User
  app.get('/api/profile', [authJwt.verifyToken], controller.dataProfile);

  // Verify JWT Token
  app.get('/api/checkToken', [authJwt.verifyToken], controller.checkToken);

  // Edit Profile
  app.post('/api/editProfile', [authJwt.verifyToken], controller.editProfile);

  // Upload Image to GCS
  app.post('/api/upload', controller.uploadToGCS);

  // app.post('/api/reqImg', controller.experiments);
};
