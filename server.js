const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
// const db = require("./app/models");
const app = express();

// Initialize Database Login
/*
  const Role = db.role;
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync Db");
    initial();
  });
*/

// Initial table role
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  Role.create({
    id: 3,
    name: "moderator",
  });
}

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Cookies initial configuration
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

// Example - simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Routing
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests and use env for better approach
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
