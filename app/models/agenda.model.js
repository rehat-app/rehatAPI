module.exports = (sequelize, Sequelize) => {
  const Agenda = sequelize.define('agenda', {
    name: {
      type: Sequelize.STRING,
    },
    agenda_date: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    id_user: {
      type: Sequelize.INTEGER,
    },
    id_community: {
      type: Sequelize.INTEGER,
    },
  });

  return Agenda;
};
