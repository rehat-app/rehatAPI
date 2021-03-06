const Sequelize = require('sequelize');
const config = require('../config/db.config.js');

// Create Sequelize instance
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
// Use Sequelize library
db.Sequelize = Sequelize;

db.sequelize = sequelize;
db.user = require('./user.model.js')(sequelize, Sequelize);
db.analysis = require('./analysis.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.community = require('../models/community.model.js')(sequelize, Sequelize);
db.agenda = require('../models/agenda.model.js')(sequelize, Sequelize);
db.user_agenda_ref = require('../models/user_agenda_ref.model.js')(
  sequelize,
  Sequelize
);
db.color = require('../models/color.model.js')(sequelize, Sequelize);
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId",
// });
// db.ROLES = ["user", "admin"];
module.exports = db;
