const models = require("../models");
const { questionschema } = require("../validation");

// post a question
const addQuestion = async (req, res) => {
  try {
    let info = {
      question: req.body.question,
      user_id: req.user,
    };
    await questionschema.validateAsync(info);

    let Question = await models.question.create(info);
    res.status(200).send(Question);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

// get all questions
const getQuestions = async (req, res) => {
  try {
    let Questions = await models.question.findAll({});
    res.status(200).send(Questions);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get a question
const getOneQuestion = async (req, res) => {
  try {
    let id = req.params.id;
    let Question = await models.question.findByPk(id);
    res.status(200).send(Question);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get all questions by a user
const getUserquestions = async (req, res) => {
  try {
    user_id = req.user;
    const Questions = await models.question.findAll({
      where: { user_id: user_id },
    });
    res.status(200).send(Questions);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete a question
const deleteQuestion = async (req, res) => {
  try {
    let id = req.params.id;
    let userId = req.user;
    let affectedRows = await models.question.destroy({
      where: { id, user_id: userId },
    });
    if (!affectedRows) return res.status(400).send("Id is not recognized");
    res.status(200).send("Question is deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  getOneQuestion,
  getUserquestions,
  deleteQuestion,
};
