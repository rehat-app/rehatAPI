const express = require('express');
const cors = require('cors');
const multer = require('multer');
const flash = require('express-flash');
const cookieSession = require('cookie-session');
const env = require('dotenv');
const db = require('./app/models');
const app = express();

// Configuration of multer file upload
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

// todo Check database is connected
const pingConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
pingConnection();

// todo Initialize Database Login
db.sequelize.sync({ force: false }).then(() => {
  console.log('Resync Db');
});

// todo Initial table role
// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user',
//   });

//   Role.create({
//     id: 2,
//     name: 'admin',
//   });

//   Role.create({
//     id: 3,
//     name: 'moderator',
//   });
// }

env.config();
app.use(flash());
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - file/images
app.use(multerMid.single('image'));

// Cookies initial configuration
app.use(
  cookieSession({
    name: 'bezkoder-session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
);

// Example - simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rehat application.' });
});

// Routing
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests and use env for better approach
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
