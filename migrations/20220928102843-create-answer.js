'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer : {
        type : Sequelize.TEXT
      },
      question_id : {
        type : Sequelize.INTEGER
      },
      user_id : {
        type : Sequelize.INTEGER
      },
      upvote : {
        type : Sequelize.INTEGER
      },
      downvote : {
        type : Sequelize.INTEGER},
        
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at : {
        allowNull: true,
        type: Sequelize.DATE
      },
      accepted_answer : {
        type : Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Answers');
  }
};