const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        db.Address
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findByName: (req, res) => {
        db.Address
        .find({ name: req.params.name })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
         db.Address
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.Address
        .remove({
            name: req.params.name
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
