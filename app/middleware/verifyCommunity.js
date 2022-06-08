const db = require('../models');

const Role = db.role;

isHost = async (req, res, next) => {
  try {
    console.log(req.userId);

    const role = await Role.findOne({
      where: {
        id: req.userId,
      },
    });

    console.log(role);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const verifyCommunity = {
  isHost,
};
module.exports = verifyCommunity;
