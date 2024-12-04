'use strict';
module.exports = (sequelize, DataTypes) => {

  const UserConversation = sequelize.define('UserConversation', {
    // userId (FK hacia Users)
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    // conversationId (FK hacia Conversations) 
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'conversation_id'
    },
    // role (opcional, string para indicar roles como "admin", "miembro", etc. en caso de conversaciones grupales)
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'user_conversation', // Nombre de la tabla en la base de datos
    timestamps: true, // Incluye createdAt y updatedAt
    // underscored: true, // Usa snake_case para nombres de columnas
  });

  // Exporta el modelo para usarlo en otras partes de la aplicación
  return UserConversation;
};


