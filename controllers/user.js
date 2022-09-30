const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const user = require("../models/user");
const { userschema } = require("../validation");

// adduser

const addUser = async (req, res) => {
  try {
    let newUser = await models.user.findOne({
      where: { email: req.body.email },
    });
    if (newUser) return res.status(400).send("user already registered.");

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
    // const token = jwt.sign({ id: user.id }, config.get("jwtPrivateKey"));
    const token = jwt.sign({ id: user.id }, process.env.jwtPrivateKey);
    res
      .header("x-auth-token", token)
      .send(_.pick(User, ["id", "first_name", "email", "last_name"]));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    let user = await models.user.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("invalid email or password");

    const token = jwt.sign({ id: user.id }, process.env.jwtPrivateKey);
    const pick = _.pick(user, ["id", "first_name", "email", "last_name"]);
    pick.token = token;
    res.status(200).send(pick);
  } catch (err) {
   res.status(400).send(err.message);
  }
};

// get current user
const currentUser = async (req, res) => {
  try {
    let id = req.user;
    const User = await models.user.findAll({ where: { id: id } });
    res.send(User);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addUser,
  loginUser,
  currentUser,
};
