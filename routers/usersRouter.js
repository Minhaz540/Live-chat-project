const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/usersController");
const decorateHtmlRes = require("../middlewares/common/decorateHtmlRes");

router.get("/", decorateHtmlRes("Users"), getUsers);

module.exports = router;
