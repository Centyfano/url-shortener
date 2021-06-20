const express = require("express");
const { addUrl, goTo, all,customAdd } = require("../controllers/urls");
const router = express.Router();

router.route("/").post(addUrl); // Add Short URL 
router.route("/custom").post(customAdd); // Custom short URL
router.route("/all").get(all);
router.route("/:code").get(goTo);

module.exports = router;
