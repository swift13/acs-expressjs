const express = require("express");
const Client = require("@etk/api-core-server").Client;
const router = express.Router();
router.get("/", async function (req, res, next) {
	try {
		const api = new Client({
			debug: true,
			auto_parse: true
		});
		await api.connect("ws://acs:8001");
		const authors = (await api.call("Author", "filter", {})).docs;
		res.render("author", {
			title: "Authors list",
			show: "list",
			authors
		});
		api.close();
	} catch (e) {
		next(e);
	}
});
router.post("/", async function (req, res, next) {
	try {
		const api = new Client({
			debug: true,
			auto_parse: true
		});
		await api.connect("ws://acs:8001");
		const id = await api.call("Author", "create", req.body);
		console.log(id);
		api.close();
		res.redirect("/author");
	} catch (e) {
		next(e);
	}
});
module.exports = router;
