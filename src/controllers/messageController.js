const messageService = require('../services/messageService');

class MessageController {
  async findAll(req, res) {
    const users = await messageService.findAll(req.query);
    res.json(users);
  }

  async cantidadMensajesNoLeidos(req, res) {
    const users = await messageService.cantidadMensajesNoLeidos(req.query);
    res.json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await messageService.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  async create(req, res) {
    const userData = req.body;
    const newUser = await messageService.create(userData);
    res.status(201).json(newUser);
  }

  async marcarMensaje(req, res) {
    const newUser = await messageService.marcarMensaje(req.body);
    res.status(201).json(newUser);
  }

  async existeConversacionUsers(req, res) {
    const data = req.body;
    const newUser = await messageService.existeConversacionUsers(data);
    res.status(201).json(newUser);
  }
}

module.exports = new MessageController();
