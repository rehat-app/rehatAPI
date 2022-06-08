const db = require('../models');
const User = db.user;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const Analysis = db.analysis;
const Community = db.community;
const Role = db.role;
const { Op } = db.Sequelize;
const { v4: uuidv4 } = require('uuid');

// Host : Create New Community
exports.createCommunity = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const idUser = req.userId;

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

    return res
      .status(200)
      .send({
        message: 'Komunitas berhasil dibuat',
        idCommunity: idCommunity,
        rescode: '200',
      });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

// User - Join Community
exports.joinCommunity = async (req, res) => {
  try {
    const idUser = req.userId;
    const token = req.body.token;
    console.log(token);

    const status = await Community.findOne({
      where: {
        token: token,
      },
    });

    if (status === null) {
      return res.status(401).send({
        rescode: 401,
        message: 'Komunitas tidak ditemukan!',
      });
    }

    const idCommunity = status.dataValues.id;

    const verifyOnceJoin = await Role.findOne({
      where: {
        id_community: idCommunity,
        id_user: idUser,
      },
    });

    if (verifyOnceJoin === null) {
      // Create data user on the community table
      await Role.create({
        id_user: idUser,
        id_community: idCommunity,
        user_role: 'member',
      });
    } else {
      return res.status(402).send({
        rescode: 402,
        message: 'Kamu telah terdaftar di komunitas ini',
      });
    }

    return res
      .status(200)
      .send({ message: 'Berhasil gabung komunitas', rescode: '200' });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

// Get All Communities
exports.allCommunities = async (req, res) => {
  try {
    const sql = `
      SELECT id_user, id_community, user_role, name FROM roles 
        JOIN communities ON roles.id_community = communities.id 
        WHERE roles.id_user = ${req.userId};
    `;

    const communities = await sequelize.query(sql, { type: QueryTypes.SELECT });

    return res.status(200).send({ communities: communities, rescode: '200' });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

// Get All Data Community with members
exports.dataCommunity = async (req, res) => {
  try {
    const id = req.params.id;

    const sqlMember = `
      SELECT username, email, image, user_role FROM users 
        JOIN roles ON users.id = roles.id_user 
        JOIN communities ON roles.id_community = communities.id 
        WHERE roles.user_role = "member" AND communities.id = ${id}
        ORDER BY users.username ASC;
    `;
    const dataMember = await sequelize.query(sqlMember, {
      type: QueryTypes.SELECT,
    });

    const sqlCom = `
      SELECT username, email, image, user_role, communities.name, description, token, DATE_FORMAT(communities.createdAt, '%m/%d/%Y') as createDate FROM users 
        JOIN roles ON users.id = roles.id_user 
        JOIN communities ON roles.id_community = communities.id 
        WHERE roles.user_role = "admin" AND communities.id = ${id};
    `;
    const dataCommunity = await sequelize.query(sqlCom, {
      type: QueryTypes.SELECT,
    });

    return res
      .status(200)
      .send({ community: dataCommunity, members: dataMember, rescode: '200' });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

exports.logging = async (req, res) => {
  const tokenInvitation = uuidv4().substring(0, 6);
  // try {

  //   return res
  //     .status(200)
  //     .send({ message: 'Hasil analysis berhasil disimpan', rescode: '200' });
  // } catch (e) {
  //   return res.status(500).send({ message: error.message });
  // }
};
