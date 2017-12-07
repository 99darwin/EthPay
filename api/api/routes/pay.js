const router = require('express').Router();
const pay = require('../../controllers/pay');

router
    .route('/send')
    .post(pay.send)

module.exports = router;
