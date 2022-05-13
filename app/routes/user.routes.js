const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // To access public content
  app.get("/api/test/all", controller.allAccess);

  // Basic User login
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // For Admin (optional)
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
