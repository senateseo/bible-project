const router = require("express").Router();
const { getphrase } = require("../controllers/bible");

router.post("/", getphrase);

module.exports = router;
