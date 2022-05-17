const router = require("express").Router();
const { getphrase, getPhraseWithKeyword } = require("../controllers/bible");

router.post("/", getphrase);
router.get("/", getPhraseWithKeyword);

module.exports = router;
