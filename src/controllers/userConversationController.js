const userConversationService = require('../services/userConversationService');

class UserConversationController {
  async findAll(req, res) {
    const users = await userConversationService.findAll(req.query);
    res.json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await userConversationService.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  async create(req, res) {
    const userData = req.body;
    const newUser = await userConversationService.create(userData);
    res.status(201).json(newUser);
  }
}

module.exports = new UserConversationController();
