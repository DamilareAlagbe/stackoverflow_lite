const models = require("../models");
const { questionschema } = require("../validation");

// post a question
const addQuestion = async (req, res) => {
  let info = {
    question: req.body.question,
    user_id: req.user,
  };
  await questionschema.validateAsync(info);

  let Question = await models.question.create(info);
  res.status(200).send(Question);
};

// get all questions
const getQuestions = async (req, res) => {
    let Questions = await models.question.findAll({});
    res.status(200).send(Questions);
  };


module.exports = {
  addQuestion,
  getQuestions,

 
};
