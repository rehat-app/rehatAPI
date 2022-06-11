const db = require('../models');
const User = db.user;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const Community = db.community;
const Agenda = db.agenda;
const AgendaUserRef = db.user_agenda_ref;
const Role = db.role;
const { Op } = db.Sequelize;

exports.createAgenda = async (req, res) => {
  try {
    const agenda = {
      idUser: req.userId,
      name: req.body.name,
      description: req.body.description,
      agendaDate: req.body.agendaDate, // "11-06-2022"
      idCommunity: req.params.id,
    };

    const insertDataAgenda = await Agenda.create({
      name: agenda.name,
      description: agenda.description,
      agenda_date: agenda.agendaDate,
      id_user: agenda.idUser,
      id_community: agenda.idCommunity,
    });

    await AgendaUserRef.create({
      id_user: agenda.idUser,
      id_agenda: insertDataAgenda.dataValues.id,
    });

    return res.status(200).send({
      message: 'Agenda berhasil dibuat',
      rescode: '200',
    });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

exports.logging = async (req, res) => {
  const date = new Date('2022-06-11');
  console.log('Logging1 ==> ', date.toDateString());

  return res.status(200).send({
    rescode: 200,
    log: date.toDateString(),
  });
};
