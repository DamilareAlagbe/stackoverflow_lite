"use strict";

const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 10],
        },
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: false,
      tableName: "Users",
    }
  );

  // Class Method
  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.question, {
    //   foreignKey : 'user_id',
    //   sourceKey : 'user_id'
    // });

    User.hasMany(models.question, { foreignKey: "user_id" });
  };

  return User;
};
