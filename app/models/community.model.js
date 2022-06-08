module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define('community', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
  });

  return Community;
};
