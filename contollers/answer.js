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


module.exports = {
  addAnswer
};

