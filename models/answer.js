"use strict";

const Sequelize = require("sequelize");

/**
 * Users model
 * @class Users
 */
module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define(
    "answer",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      answer: {
        type: Sequelize.TEXT,
      },
      question_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      upvote: {
        type: Sequelize.INTEGER,
      },
      downvote: {
        type: Sequelize.INTEGER,
      },
      accepted_answer: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      userId: "user_id",
      paranoid: true,
      underscored: false,
      tableName: "Answers",
    }
  );

  // Class Method
  Answer.associate = function (models) {
    // associations can be defined here

    Answer.belongsTo(models.question, { foreignKey: "question_id" });
    Answer.hasMany(models.comment, { foreignKey: "answer_id" });
  };

  return Answer;
};
