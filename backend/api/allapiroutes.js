const express = require("express");
const router = express.Router();

router.use('/user', require("./user"));
router.use("/admin", require("./admin"));
router.use("/house", require("./house"));
module.exports = router