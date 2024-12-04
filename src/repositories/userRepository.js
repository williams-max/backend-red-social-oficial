
const { User } = require('../models'); 
const { Op } = require('sequelize');

class UserRepository {
  async findAll(params) {
    const query = {
      where: {}
    };
    if (params?.id) {
      query.where.id = {
        [Op.not]: params?.id
      };

    }
    console.log("aaaa ")
    return User.findAll(query);
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async create(userData) {
    return User.create(userData);
  }
   // Método para encontrar un usuario por criterios específicos
   async findOne(conditions) {
    return User.findOne({ where: conditions });
  }
}

module.exports = new UserRepository();
