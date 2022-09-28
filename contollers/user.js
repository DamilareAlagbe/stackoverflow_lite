const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const user = require("../models/user");
const { userschema } = require("../validation");

// adduser

const addUser = async (req, res) => {
  let sike = await models.user.findOne({ where: { email: req.body.email } });
  if (sike) return res.status(400).send("user already registered.");

  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userschema.validateAsync(user);

  // hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // create user
  let User = await models.user.create(user);
  const token = jwt.sign({ id: user.id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token)
    .send(_.pick(User, ["id", "first_name", "email", "last_name"]));
};


module.exports = {
  addUser
};
