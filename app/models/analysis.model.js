module.exports = (sequelize, Sequelize) => {
  const Analysis = sequelize.define('analysis', {
    user_id: {
      type: Sequelize.INTEGER,
    },
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
