const router = require("express").Router();
const addressRoute = require("./address");
const payRoute = require("./pay");

router.use("/address", addressRoute);
router.use("/pay", payRoute);

module.exports = router;
