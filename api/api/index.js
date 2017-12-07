const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./routes");

router.use("/api", apiRoutes);

module.exports = router;
