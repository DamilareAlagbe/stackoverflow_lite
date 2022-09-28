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
  


// accept an answer
const acceptanswer = async (req, res) => {
    const answer_id = req.params.id;
    const user_id = req.user;
    let answer = await models.answer.findByPk(answer_id);
    let questions = await models.question.findOne({
      where: { id: answer.question_id, user_id },
    });
    if (!questions) {
      res.send("user not allowed");
    }
    const resultVote = await models.answer.update(
      { accepted_answer: false },
      { where: { id: answer_id } }
    );
    if (resultVote[0] < 1) {
      res.status(503).send("server error");
    }
    // console.log('resultvote',resultVote)
    res.status(204).send();
  };
  

//upvote an answer 
const getUpvote = async (req, res) => {
    let id = req.params.id;
    const answer = await models.answer.findOne(
      { attributes: ["upvote"] },
      { where: { id: id } }
    );
    const resultVote = await models.answer.update(
      { upvote: answer.upvote + 1 },
      { where: { id: id } }
    );
    res.status(200).send();
  };


  //downvote an answer 
const getDownvote = async (req, res) => {
    let id = req.params.id;
    const answer = await models.answer.findOne(
      { attributes: ["downvote"] },
      { where: { id: id } }
    );
    const resultVote = await models.answer.update(
      { downvote: answer.downvote + 1 },
      { where: { id: id } }
    );
    res.status(200).send();
  };
  
module.exports = {
  addAnswer,
  getAnswers,
  acceptanswer,
  getUpvote,
  getDownvote
};

