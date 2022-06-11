const db = require('../models');
const User = db.user;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const Analysis = db.analysis;
const Community = db.community;
const Role = db.role;
const { Op } = db.Sequelize;

exports.createAgenda = async (req, res) => {
  try {
    const agenda = {
      idUser: req.userId,
      description: req.description,
      idCommunity: req.params.id,
      agendaDate: req.agenda_date,
    };

    // Generate Token Invitation
    const tokenInvitation = uuidv4().substring(0, 6);

    const insertData = await Community.create({
      name: name,
      description: description,
      token: tokenInvitation,
    });

    // console.log(insertData.dataValues);  // to get value inside table after insert
    const idCommunity = insertData.dataValues.id;

    // Insert data admin on the community table
    await Role.create({
      id_user: idUser,
      id_community: idCommunity,
      user_role: 'admin',
    });

    return res.status(200).send({
      message: 'Komunitas berhasil dibuat',
      idCommunity: idCommunity,
      rescode: '200',
    });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

exports.logging = async (req, res) => {
  return res.status(200).send({
    rescode: 200,
    message: req.params.id,
  });
};
