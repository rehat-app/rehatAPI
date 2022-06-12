module.exports = (sequelize, Sequelize) => {
  const Color = sequelize.define('color', {
    hue: {
      type: Sequelize.INTEGER,
    },
    saturation: {
      type: Sequelize.STRING,
    },
    light: {
      type: Sequelize.STRING,
    },
    opacity: {
      type: Sequelize.INTEGER,
    },
    id_community: {
      type: Sequelize.INTEGER,
    },
  });

  return Color;
};
