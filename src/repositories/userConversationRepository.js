
const { UserConversation, Conversation, Message, User } = require('../models'); 
const { Op } = require('sequelize');
const db = require('../models');  // Importa `db` para acceder a `sequelize`
class UserConversationRepository {
  async findAll(params) {
    const query = {
      where: {}
    };
    
    // Si se proporciona `userId`, comprueba si es un array o un valor único
    if (params?.userId) {
      if (Array.isArray(params?.userId)) {
          // Si `userId` es un array, usa `Op.in`
          query.where.userId = {
              [Op.in]: params?.userId
          };
      } else {
          // Si `userId` es un valor único, usa el valor directamente
          query.where.userId = params?.userId;
      }
    }
    return UserConversation.findAll({
      ... query, // Pasamos el objeto `query` construido dinámicamente
      include: [
        {
          model: Conversation,
          as: 'conversation', // Alias que usaste en la asociación
          require: true,
          // attributes: ['id', 'name'] //
          /* include: [
            {
              model: Message,
              as: 'messageslast', // Alias que usaste en la asociación
              // attributes: ['id', 'name'] //
              required: true,
              subQuery: false, // Desactiva la subconsulta
              limit: 1, // Limitar a 1 mensaje
              order: [['createdAt', 'DESC']], // Ordenar por createdAt en orden descendente
              include: [
                {
                  model: User,
                  as: 'userCreador', // Alias que usaste en la asociación
                  // attributes: ['id', 'name'] //
                }
              ],
              // Usamos un literal para la subconsulta, seleccionando el último mensaje
               // Utilizando un `Sequelize.literal` en una subconsulta para obtener el último mensaje
            }
          ] */
        }
      ]
    });
  }

  async findById(id) {
    return UserConversation.findByPk(id);
  }

  async create(UserConversationData) {
    return UserConversation.create(UserConversationData);
  }
}

module.exports = new UserConversationRepository();
