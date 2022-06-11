module.exports = (sequelize, Sequelize) => {
  const User_Agenda_Ref = sequelize.define('user_agenda_ref', {
    id_user: {
      type: Sequelize.INTEGER,
    },
    id_agenda: {
      type: Sequelize.INTEGER,
    },
  });
  return User_Agenda_Ref;
};
