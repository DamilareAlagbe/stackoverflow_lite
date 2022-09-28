"use strict";

const Sequelize = require("sequelize");

/**
 * Users model
 * @class Users
 */
module.exports = function (sequelize, DataTypes) {
  var Question = sequelize.define(
    "question",
    {
      /**
       * @property id
       * @type {integer}
       */
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: false,
      tableName: "Questions",
    }
  );

  // Class Method
  Question.associate = function (models) {
    Question.belongsTo(models.user, { foreignKey: "user_id" });
    Question.hasMany(models.answer, { foreignKey: "question_id" });
  };

  return Question;
};
