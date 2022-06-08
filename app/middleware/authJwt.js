const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const decode = require('../helpers/decode.js');

const db = require('../models');

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  const { token } = req.session;
  if (!token) {
    return res.status(403).send({
      rescode: 403,
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        rescode: 401,
        message: 'Unauthorized!',
      });
    }
    // get JWT id after decode
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }
    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
  }
};

isHost = async (req, res, next) => {
  try {
    const role = await Role.findOne({
      where: {
        id_user: req.userId,
      },
    });

    // eslint-disable-next-line
    const role_status = role === null ? null : role.dataValues.user_role;

    if (role_status === 'admin') {
      return res.status(403).send({
        rescode: 403,
        message: 'Kamu admin!!!',
      });
    }

    next();
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

mustHost = async (req, res, next) => {
  try {
    const role = await Role.findOne({
      where: {
        id_user: req.userId,
        id_community: req.params.id,
      },
    });

    const role_status = role === null ? null : role.dataValues.user_role;

    if (role_status === 'member') {
      return res.status(401).send({
        rescode: 401,
        message: 'Unauthorized!!!',
      });
    }

    next();
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

// isModeratorOrAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.userId);
//     const roles = await user.getRoles();
//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator") {
//         return next();
//       }
//       if (roles[i].name === "admin") {
//         return next();
//       }
//     }
//     return res.status(403).send({
//       message: "Require Moderator or Admin Role!",
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate Moderator or Admin role!",
//     });
//   }
// };

const authJwt = {
  verifyToken,
  isAdmin,
  isHost,
  mustHost,
  // isModeratorOrAdmin,
};
module.exports = authJwt;
