'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_conversation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // userId (FK hacia Users)
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id'
      },
      // conversationId (FK hacia Conversations) 
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'conversation_id'
      },
      // role (opcional, string para indicar roles como "admin", "miembro", etc. en caso de conversaciones grupales)
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_conversation');
  }
};