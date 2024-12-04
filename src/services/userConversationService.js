const messageRepository = require('../repositories/messageRepository');
const userConversationRepository = require('../repositories/userConversationRepository');

class UserConversationService {
  async findAll(params) {
    const usersConversations = await userConversationRepository.findAll(params);
  
    console.log('params ', params)
    // Usar Promise.all para esperar todas las promesas de 'findOne' dentro de map()
    const plainUsersConversations = await Promise.all(
      usersConversations.map(async (userConversation) => {
        const plainUserConversation = userConversation.get({ plain: true }); // Convierte a plano
  
        // Busca el último mensaje para cada conversación
        const messagelast = await messageRepository.findOne({
          where: { conversationId: userConversation.conversationId },
          order: [['createdAt', 'DESC']], // Ordena por 'createdAt' para obtener el último mensaje,
          ingoreUserCreated : params.userId
        });
  
        // Agregar el último mensaje al objeto plano
        plainUserConversation.messagelast = messagelast;
  
        return plainUserConversation;
      })
    );
  
    // Devuelve el resultado con el valor agregado
    return plainUsersConversations;
  }
  

  async findById(id) {
    return userConversationRepository.findById(id);
  }

  async create(userData) {
    return userConversationRepository.create(userData);
  }
}

module.exports = new UserConversationService();
