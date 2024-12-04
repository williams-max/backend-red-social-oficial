const conversationRepository = require('../repositories/conversationRepository');
const messageRepository = require('../repositories/messageRepository');
const userConversationRepository = require('../repositories/userConversationRepository');

class MessageService {
  async findAll(params) {
    return messageRepository.findAll(params);
  }

  async cantidadMensajesNoLeidos(params) {
    const response = await messageRepository.cantidadMensajesNoLeidos(params);
    return response[0] || 0
  }

  async findById(id) {
    return messageRepository.findById(id);
  }

  async marcarMensaje(params) {
    return messageRepository.marcarMensaje(params);
  }

  async existeConversacionUsers(params) {
    const existeConversacion = await messageRepository.existeConversacionUsers({
      remitenteId: params.remitenteId, receptorId: params.receptorId})
    return existeConversacion
  }
  async create(userData) {

    let response = null
    const existeConversacion = await messageRepository.existeConversacionUsers({
      remitenteId: userData.remitenteId, receptorId: userData.receptorId})
    if(existeConversacion?.length == 0){
      // 1 creamos en mensaje
      const conversacionCreada = await  conversationRepository.create(userData);
  
      const userConversations = await Promise.all(
        [userData.remitenteId, userData.receptorId].map(userId => 
          userConversationRepository.create({
            userId,
            conversationId: conversacionCreada.id
          })
        )
      );
      userData.conversationId = conversacionCreada.id
      userData.senderId = userData.receptorId
      userData.userCreated = userData.remitenteId
      response = await  messageRepository.create(userData);
    } else {
      // si existe conversacion 
      const existeConversacion = await messageRepository.existeConversacionUsers({
        remitenteId: userData.remitenteId, receptorId: userData.receptorId})
      if(existeConversacion?.length> 0){
        userData.conversationId = existeConversacion[0].conversation_id
        userData.senderId = userData.receptorId
        userData.userCreated = userData.remitenteId
        response = await  messageRepository.create(userData);
      }
    }
    return response
  }
}

module.exports = new MessageService();
