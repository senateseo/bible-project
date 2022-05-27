const router = require("express").Router();
const { getphrase } = require("../controllers/bible");

router.get("/", getphrase);

module.exports = router;
