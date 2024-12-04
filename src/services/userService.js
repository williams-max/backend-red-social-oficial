const userRepository = require('../repositories/userRepository');

class UserService {
  async findAll(params) {
    return userRepository.findAll(params);
  }

  async findById(id) {
    return userRepository.findById(id);
  }

  async create(userData) {
    return userRepository.create(userData);
  }
  // Método para encontrar un usuario por criterios específicos
   async findOne(conditions) {
    return userRepository.findOne(conditions);
  }
}

module.exports = new UserService();
