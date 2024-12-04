const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.findAll);
router.get('/users/:id', userController.findById);
router.post('/users', userController.create);
router.post('/register', userController.register); // Ruta para registrar usuarios
router.post('/auth', userController.auth); // Ruta para autenticar usuarios

module.exports = router;
