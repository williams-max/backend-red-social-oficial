const conversationRepository = require('../repositories/conversationRepository');

class ConversationService {
  async findAll() {
    return conversationRepository.findAll();
  }

  async findById(id) {
    return conversationRepository.findById(id);
  }

  async create(userData) {
    return conversationRepository.create(userData);
  }
}

module.exports = new ConversationService();
