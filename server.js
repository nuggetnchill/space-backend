const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "postgres",
    password: "123456",
    database: "postgres",
  },
});

const database = {
  users: [
    {
      id: "123",
      name: "Justin",
      email: "hello@gmail.com",
      password: "hello",
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sarah",
      email: "sarah@gmail.com",
      password: "fart",
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error Logging IN");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Unable to Register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error Getting User"));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port 3001 ${process.env.PORT}`);
});
