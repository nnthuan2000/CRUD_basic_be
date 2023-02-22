const db = require('../models');
const Tutorial = db.tutorials;
const { Op } = db.Sequelize;

/**
 * create a new Tutorial: create(object)
 * find a Tutorial by id: findByPk(id)
 * get all Tutorials: findAll()
 * update a Tutorial by id: update(data, where: { id: id })
 * remove a Tutorial: destroy(where: { id: id })
 * remove all Tutorials: destroy(where: {})
 * find all Tutorials by title: findAll({ where: { title: ... } })
 */

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).json({
            status: 'fail',
            message: 'Content can not be empty',
        });
        return;
    }

    // Create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published,
    };

    Tutorial.create(tutorial)
        .then((data) => res.send(data))
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}` } } : null;

    Tutorial.findAll({ where: condition })
        .then((data) => res.send(data))
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then((data) => {
            if (data) res.send(data);
            else
                res.status(400).send({
                    message: `Cannot find Tutorial with id = ${id}`,
                });
        })
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, { where: { id: id } })
        .then((num) => {
            if (num[0] === 1) res.send({ message: 'Tutorial was updated successfully' });
            else
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial not found`,
                });
        })
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({ where: { id: id } })
        .then((num) => {
            if (num === 1) res.send({ message: 'Tutorial was deleted successfully' });
            else
                res.send({
                    message: `Cannot delete tutorial with id=${id}. Maybe Tutorial was not found`,
                });
        })
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({ where: {}, truncate: false })
        .then((nums) => res.send({ message: `${nums} Tutorials were deleted successfully` }))
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then((data) => res.send(data))
        .catch((err) =>
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.',
            })
        );
};
