'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('message', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // conversationId (FK hacia Conversations)
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'conversation_id'
      },
      // senderId (FK hacia Users, indica quién envió el mensaje) 
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sender_id'
      },
      // content (texto o datos del mensaje)
      content: {
        type: Sequelize.STRING,
        allowNull: true, // Asegúrate de que el nombre no sea nulo
      },
      unread: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: 'unread'
      },
      userCreated: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_created'
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
    await queryInterface.dropTable('message');
  }
};