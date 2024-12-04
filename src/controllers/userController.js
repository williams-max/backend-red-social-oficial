const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Configura tu clave secreta en .env

class UserController {
  async register (req, res) {
    try {
      const { name, email, password } = req.body;
      // Verificar si el usuario ya existe
      const existingUser = await userService.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear nuevo usuario
      const newUser = await userService.create({ name, email, password: hashedPassword });
  
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  async auth (req, res) {
    try {
      const { email, password } = req.body;
  
      // Buscar usuario
      const user = await userService.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Comparar la contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Generar token
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
  
      return res.status(200).json({ message: 'Authentication successful', token , user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  async findAll(req, res) {
    console.log("req ", req.query)
    const users = await userService.findAll(req.query);
    res.json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  }

  async create(req, res) {
    const userData = req.body;
    const newUser = await userService.create(userData);
    res.status(201).json(newUser);
  }
}

module.exports = new UserController();
