
const { Message, User } = require('../models'); 
const { Op } = require('sequelize');
const db = require('../models');  // Importa `db` para acceder a `sequelize`
class MessageRepository {
  async findAll(params) {
    const query = {
      where: {}
    };
    
    // Si se proporciona `userId`, comprueba si es un array o un valor único
    if (params?.senderId) {
      if (Array.isArray(params?.senderId)) {
          // Si `userId` es un array, usa `Op.in`
          query.where.senderId = {
              [Op.in]: params?.senderId
          };
      } else {
          // Si `userId` es un valor único, usa el valor directamente
          query.where.senderId = params?.senderId;
      }
    }
    if (params?.conversationId) {
      if (Array.isArray(params?.conversationId)) {
          // Si `userId` es un array, usa `Op.in`
          query.where.conversationId = {
              [Op.in]: params?.conversationId
          };
      } else {
          // Si `userId` es un valor único, usa el valor directamente
          query.where.conversationId = params?.conversationId;
      }
    }
    return Message.findAll({
      ... query, // Pasamos el objeto `query` construido dinámicamente
      include: [
        {
          model: User,
          as: 'userCreador', // Alias que usaste en la asociación
          // attributes: ['id', 'name'] //
        }
      ]
    });
  }

  async  cantidadMensajesNoLeidos (params = {}) {
    const consulta = `
    SELECT COUNT(*) AS total
    FROM message m
    WHERE sender_id = ${params.userId} AND unread = false; 
    `
    const result = await db.sequelize.query(
      consulta, { type: db.Sequelize.QueryTypes.SELECT });
    return result;
  }

  async  existeConversacionUsers (params = {}) {

    const consulta = `
    SELECT conversation_id
    FROM user_conversation
    WHERE user_id IN ('${params.remitenteId}', '${params.receptorId}')
    GROUP BY conversation_id
    HAVING COUNT(DISTINCT user_id) = 2; 
        `
    const result = await db.sequelize.query(
      consulta, { type: db.Sequelize.QueryTypes.SELECT });
    return result;
  } 

  async  marcarMensaje (params = {}) {
       // "remitenteId": state.user.id,
      // "receptorId":  parametros.user.id
      console.log(" params update ", params)
    const consulta = `
    UPDATE message SET unread=1
    WHERE sender_id=${params.remitenteId} and user_created=${params.receptorId};    
        `
        console.log("consulta ", consulta)
    const result = await db.sequelize.query(
      consulta, { type: db.Sequelize.QueryTypes.UPDATE });
    return result;
  } 

  async findById(id) {
    return Message.findByPk(id);
  }

  /* async create(MessageData) {
    return Message.create(MessageData);
  } */

  async create(MessageData) {
    // Crea el mensaje
    const message = await Message.create(MessageData);
  
    // Luego, recupera el mensaje con los datos del usuario relacionado
    return Message.findOne({
      where: { id: message.id },
      include: [
        {
          model: User,
          as: 'userCreador',
          // attributes: ['id', 'name'] // Atributos que deseas incluir
        }
      ]
    });
  }

  // Método para encontrar un usuario por criterios específicos
  async findOne(conditions) {
    return Message.findOne({ 
      where: conditions.where,
      order: conditions.order,
      include: [
        {
          model: User,
          as: 'userCreador',
          // attributes: ['id', 'name'] // Atributos que deseas incluir
        }
      ]
    });
  }

  async findOne(conditions) {
    return Message.findOne({ 
      where: {
        ...conditions.where,
        userCreated: {
          [Op.ne]: conditions.ingoreUserCreated  // Esto ignora los registros con userCreadorId igual a 2
        }
      },
      order: conditions.order,
      include: [
        {
          model: User,
          as: 'userCreador',
          // attributes: ['id', 'name'] // Atributos que deseas incluir
        }
      ]
    });
  }
  
  async create(MessageData) {
    const message = await Message.create(MessageData);
  
    // Ahora, hacemos una búsqueda para incluir los datos relacionados
    return Message.findOne({
      where: { id: message.id },
      include: [
        {
          model: User,
          as: 'userCreador', // Alias usado en la asociación
          // attributes: ['id', 'name'] // Atributos que quieras incluir
        }
      ]
    });
  }
}





module.exports = new MessageRepository();
