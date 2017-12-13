const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        db.Employee
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    new: (req, res) => {
         db.Employee
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.Employee
        .remove(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
