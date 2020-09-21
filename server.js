const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "postgres",
    password: "123456",
    database: "postgres",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(bodyParser.json());

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
  res.send("otter space api is listening");
});

// app.post('/signin',(req,res)=>{

// })

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

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port 3001 ${process.env.PORT}`);
});
