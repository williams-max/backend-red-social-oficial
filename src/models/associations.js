// associations.js
module.exports = (sequelize) => {
    const {User, UserConversation ,Conversation , Message } = sequelize.models;
  
    // Definir las relaciones entre modelos

      UserConversation.belongsTo(Conversation, {
        foreignKey: 'conversationId',
        as: 'conversation' // Alias para usar en las consultas
      });

      Conversation.hasMany(Message, { // Asociación con Message
        foreignKey: 'conversationId', // La clave foránea en Message
        as: 'messages' // Alias para usar en las consultas
      });
      Message.belongsTo(User, { // Asociación con Message
        foreignKey: 'userCreated', // La clave foránea en Message
        as: 'userCreador' // Alias para usar en las consultas
      });
     /* UserConversation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user' // Alias para usar en las consultas
      }); */
  
      // user-converstiation puede tener muchas coversaciones
      
    // Añade más asociaciones si tienes otros modelos
  };
  