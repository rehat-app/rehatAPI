const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post('/api/auth/signin', controller.signin);

  app.get('/api/auth/signout', controller.signout);

  // Change Password
  app.post('/api/auth/reset-password-email', controller.resetPassword);

  // Update Password
  app.post('/api/auth/update-password', controller.updatePassword);
};
