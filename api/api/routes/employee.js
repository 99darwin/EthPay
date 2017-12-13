const router = require('express').Router();
const employee = require('../../controllers/employee');

router
    .route('/list')
    .get(employee.findAll);

router
    .route('/new')
    .post(employee.new);

router
    .route('/remove')
    .post(employee.remove);

module.exports = router;
