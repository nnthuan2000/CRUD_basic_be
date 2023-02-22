const express = require('express');
const tutorialController = require('../controllers/tutorial.controller');

const router = express.Router();

/**
 * /api/tutorials: GET, POST, DELETE
 * /api/tutorials/:id: GET, PUT, DELETE
 * /api/tutorials/published: GET
 */

router
    .route('/')
    .get(tutorialController.findAll)
    .post(tutorialController.create)
    .delete(tutorialController.deleteAll);

router
    .route('/:id')
    .get(tutorialController.findOne)
    .put(tutorialController.update)
    .delete(tutorialController.delete);

router.route('/published').get(tutorialController.findAllPublished);

module.exports = router;
