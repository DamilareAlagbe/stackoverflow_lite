const models = require("../models");
const { answerschema } = require("../validation");

// post an answer
const addAnswer = async (req, res) => {
  try{
    let info = {
      answer: req.body.answer,
      user_id: req.user,
      question_id: req.params.id,
      upvote: 0,
      downvote: 0,
    };
    const result = await answerschema.validateAsync(info);
    let Answer = await models.answer.create(result);
    res.status(200).send(Answer);
  }catch(err){
    res.status(400).send(err.message)
  }
};


//get all Answer to a question
const getAnswers = async (req, res) => {
  try{
    let question_id = req.params.id;
    let Answers = await models.answer.findAll({
      where: { question_id: question_id },
    });
    res.status(200).send(Answers);
  }catch(err){
    res.status(400).send(err.message)
  }
  };
  


// accept an answer
const acceptanswer = async (req, res) => {
  try{
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
      { accepted_answer: true },
      { where: { id: answer_id } }
    );
    if (resultVote[0] < 1) {
      res.status(503).send("server error");
    }
    res.status(204).send();
  }catch(err){
    res.status(400).send(err.message)
  }
  };
  

//upvote an answer 
const getUpvote = async (req, res) => {
  try{
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
  }catch(err){
    res.status(400).send(err.message)
  }
   
  };


  //downvote an answer 
const getDownvote = async (req, res) => {
  try{
    let id = req.params.id;
    const answer = await models.answer.findOne(
      { attributes: ["downvote"] },
      { where: { id: id } }
    );
    const resultVote = await models.answer.update(
      { downvote: answer.downvote + 1 },
      { where: { id: id } }
    );
   return res.status(200).send();
  }catch(err){
    res.status(400).send(err.message)
  }
   
  };
  
module.exports = {
  addAnswer,
  getAnswers,
  acceptanswer,
  getUpvote,
  getDownvote
};

