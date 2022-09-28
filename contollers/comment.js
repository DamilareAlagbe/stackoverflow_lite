const models = require("../models");
const { commentschema } = require("../validation");

// add a comment
const addComment = async (req, res) => {
  let info = {
    comment: req.body.comment,
    user_id: req.user,
    answer_id: req.params.id,
  };

  const result = await commentschema.validateAsync(info);
  let Comment = await models.comment.create(info);
  // console.log('info' , info)
  res.status(200).send(Comment);
};


// get comment
const getComments = async (req, res) => {
    let answerId = req.params.id
    let Comments = await models.comment.findAll({where : {answer_id :answerId}});
  
    res.status(200).send(Comments);
  };





module.exports = {
    addComment,
    getComments
  };
  