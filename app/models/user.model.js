module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    // no_telepon: {
    //   type: Sequelize.STRING,
    // },
    // no_WA: {
    //   type: Sequelize.STRING,
    // },
    // image: {
    //   type: Sequelize.STRING,
    // },
  });

  return User;
};
