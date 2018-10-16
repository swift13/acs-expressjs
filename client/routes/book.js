const express = require("express");
const router = express.Router();
//TODO implement
router.get("/", function (req, res, next) {
	res.render("book");
});
module.exports = router;
