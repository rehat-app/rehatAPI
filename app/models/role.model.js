module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    id_user: {
      type: Sequelize.INTEGER,
    },
    id_community: {
      type: Sequelize.INTEGER,
    },
    user_role: {
      type: Sequelize.STRING,
    },
  });
  return Role;
};
