const express = require("express");
const router = express.Router();

const { getLogin } = require("../controllers/loginController");
const decorateHtmlRes = require("../middlewares/common/decorateHtmlRes");

router.get("/", decorateHtmlRes("Login"), getLogin);

module.exports = router;
