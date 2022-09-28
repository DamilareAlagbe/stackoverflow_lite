const Joi = require("joi");

const userschema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const questionschema = Joi.object({
  question: Joi.string().required(),
});

const answerschema = Joi.object({
  answer: Joi.string().required(),
  user_id: Joi.number().integer(),
  question_id: Joi.number().integer(),
  upvote: Joi.number().integer(),
  downvote: Joi.number().integer(),
});

const commentschema = Joi.object({
  comment: Joi.string().required(),
  user_id: Joi.number().integer(),
  answer_id: Joi.number().integer(),
});

module.exports = {
  userschema,
  questionschema,
  answerschema,
  commentschema,
};
