const conversationService = require('../services/conversationService');

class ConversationController {
  async findAll(req, res) {
    const users = await conversationService.findAll();
    res.json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await conversationService.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  async create(req, res) {
    const userData = req.body;
    const newUser = await conversationService.create(userData);
    res.status(201).json(newUser);
  }
}

module.exports = new ConversationController();
