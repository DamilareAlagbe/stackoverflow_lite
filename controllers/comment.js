const models = require("../models");
const { commentschema } = require("../validation");

// add a comment
const addComment = async (req, res) => {
  try {
    let info = {
      comment: req.body.comment,
      user_id: req.user,
      answer_id: req.params.id,
    };

    const result = await commentschema.validateAsync(info);
    let Comment = await models.comment.create(info);
    res.status(200).send(Comment);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get comment
const getComments = async (req, res) => {
  try {
    let answerId = req.params.id;
    let Comments = await models.comment.findAll({
      where: { answer_id: answerId },
    });
    res.status(200).send(Comments);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete comment
const deleteComment = async (req, res) => {
  try {
    let id = req.params.id;
    let Comment = await models.comment.destroy({ where: { id: id } });
    res.status(200).send("Comment is deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
