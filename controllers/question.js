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


  // get a question
const getOneQuestion = async (req, res) => {
    let id = req.params.id;
    let Question = await models.question.findByPk(id);
    res.status(200).send(Question);
  };
  
  // get all questions by a user
  const getUserquestions = async (req, res) => {
    user_id = req.user;
    const Questions = await models.question.findAll({
      where: { user_id: user_id },
    });
    res.status(200).send(Questions);
  };
  
// delete a question
  const deleteQuestion = async (req, res) => {
    let id = req.params.id;
    let userId = req.user;
    let affectedRows = await models.question.destroy({
      where: { id, user_id: userId },
    });
    if (!affectedRows) return res.status(400).send("Id is not recognized");
    res.status(200).send("Question is deleted");
  };

module.exports = {
  addQuestion,
  getQuestions,
  getOneQuestion,
  getUserquestions,
  deleteQuestion,

 
};
