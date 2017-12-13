const router = require("express").Router();
const employeeRoute = require("./employee");
const payRoute = require("./pay");

router.use("/employee", employeeRoute);
router.use("/pay", payRoute);

module.exports = router;
