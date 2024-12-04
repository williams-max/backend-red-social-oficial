const express = require('express');
const userConversationController = require('../controllers/userConversationController');
const router = express.Router();

router.get('/users-conversation', userConversationController.findAll);
router.get('/users-conversation/:id', userConversationController.findById);
router.post('/users-conversation', userConversationController.create);

module.exports = router;
