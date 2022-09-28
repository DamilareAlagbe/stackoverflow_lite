"use strict";

const Sequelize = require("sequelize");

/**
 * Users model
 * @class Users
 */
module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define(
    "comment",
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
      comment: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      answer_id: {
        type: Sequelize.INTEGER,
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
      tableName: "Comments",
    }
  );

  // Class Method
  Comment.associate = function (models) {
    // associations can be defined here
    // Comment.belongsTo(models.answer, {
    //   foreignKey : 'answer_id',
    //   targetKey : 'answer_id'
    // });
    Comment.belongsTo(models.answer, { foreignKey: "answer_id" });
  };

  return Comment;
};
