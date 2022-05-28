module.exports = (sequelize, Sequelize) => {
  const Analysis = sequelize.define('analysis', {
    hanging_eyelids: {
      type: Sequelize.STRING,
    },
    eyes_bag: {
      type: Sequelize.STRING,
    },
    calculation: {
      type: Sequelize.STRING,
    },
    face_img: {
      type: Sequelize.STRING, // image url
    },
  });

  return Analysis;
};
