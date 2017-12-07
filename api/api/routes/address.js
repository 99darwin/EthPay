const router = require('express').Router();
const address = require('../../controllers/address');

router
    .route('/')
    .get(address.findAll)
    .post(address.create)

module.exports = router;
