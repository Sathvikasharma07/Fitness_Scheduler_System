const express = require('express');
const ClassController = require('../controllers/classController');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

const Class = require('../models/class');
const classController = new ClassController(Class);

// Protect all class routes
router.post('/', authenticateJWT, classController.createClass.bind(classController));
router.get('/', authenticateJWT, classController.getClasses.bind(classController));
router.put('/:id', authenticateJWT, classController.updateClass.bind(classController));
router.delete('/:id', authenticateJWT, classController.deleteClass.bind(classController));

module.exports = router;