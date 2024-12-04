const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

router.get('/message', messageController.findAll);
router.get('/message-unread', messageController.cantidadMensajesNoLeidos);
router.post('/message-marcar', messageController.marcarMensaje);
router.get('/message/:id', messageController.findById);
router.post('/message', messageController.create);
router.post('/existe-conversacion', messageController.existeConversacionUsers);

module.exports = router;
