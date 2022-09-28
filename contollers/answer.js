const models = require("../models");
const { answerschema } = require("../validation");

// post an answer
const addAnswer = async (req, res) => {
  let info = {
    answer: req.body.answer,
    user_id: req.user,
    question_id: req.params.id,
    upvote: 0,
    downvote: 0,
  };
  const result = await answerschema.validateAsync(info);

  // console.log('result', result)
  let Answer = await models.answer.create(result);
  res.status(200).send(Answer);
};


//get all Answer to a question
const getAnswers = async (req, res) => {
    let question_id = req.params.id;
    let Answers = await models.answer.findAll({
      where: { question_id: question_id },
    });
    res.status(200).send(Answers);
  };
  


module.exports = {
  addAnswer,
  getAnswers,

};

