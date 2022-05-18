const { user } = require('../models');
const db = require('../models');

const User = db.user;
const { Op } = db.Sequelize;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

// This is optional
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

// GET user data
exports.dataProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User not found!', rescode: '404' });
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image || 'default image',
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// === User Controller Content
exports.getDataUser = (req, res) => {
  res.redirect('/api/test/user');
};
