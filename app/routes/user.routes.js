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

  // Post analyses data to DB
  app.post('/api/postAnalysis', [authJwt.verifyToken], controller.postAnalysis);
  // Get all analyses during a week
  app.get(
    '/api/weeklyAnalysis',
    [authJwt.verifyToken],
    controller.getAnalysisInWeek
  );
  // Get specific analysis by id
  app.get(
    '/api/weeklyAnalysis/:id',
    [authJwt.verifyToken],
    controller.getAnalysisById
  );

  //todo: Predict
  app.post('/api/predict', [authJwt.verifyToken], controller.getPrediction);

  // Generate to PDF
  app.get('/api/pdf', controller.uploadToPDF);
};
