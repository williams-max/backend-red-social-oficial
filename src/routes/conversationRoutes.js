const express = require('express');
const conversationController = require('../controllers/conversationController');
const router = express.Router();

router.get('/conversation', conversationController.findAll);
router.get('/conversation/:id', conversationController.findById);
router.post('/conversation', conversationController.create);

module.exports = router;
