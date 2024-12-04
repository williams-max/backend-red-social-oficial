
const { Conversation, Message } = require('../models'); 

class ConversationRepository {
  async findAll(params) {
    const query = {};
    
    /* if (params.userId) {
      query.userId = params.userId;
    } */
    return Conversation.findAll({
      where: query, // Pasamos el objeto `query` construido dinámicamente
      include: [
        {
          model: Message,
          as: 'messages', // Alias que usaste en la asociación
          // attributes: ['id', 'name'] //
        }
      ]
    });
  }

  async findById(id) {
    return Conversation.findByPk(id);
  }

  async create(ConversationData) {
    return Conversation.create(ConversationData);
  }
}

module.exports = new ConversationRepository();
