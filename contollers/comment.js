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






module.exports = {
    addComment
  };
  