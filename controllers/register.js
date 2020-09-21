const handleRegister = (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then(console.log);
  res.json(db.users);
};

module.exports = {
  handleRegister: handleRegister,
};
