'use strict';
module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    // conversationId (FK hacia Conversations)
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'conversation_id'
    },
    // senderId (FK hacia Users, indica quién envió el mensaje) 
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'sender_id'
    },
    // content (texto o datos del mensaje)
    content: {
      type: DataTypes.STRING,
      allowNull: true, // Asegúrate de que el nombre no sea nulo
    },
    userCreated: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_created'
    },
    unread: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'unread'
    }
  }, {
    tableName: 'message', // Nombre de la tabla en la base de datos
    timestamps: true, // Incluye createdAt y updatedAt
    // underscored: true, // Usa snake_case para nombres de columnas
  });

  // Exporta el modelo para usarlo en otras partes de la aplicación
  return Message;
};


