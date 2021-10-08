const express = require("express");
const router = express.Router();

const { getInbox } = require("../controllers/inboxController");
const decorateHtmlRes = require("../middlewares/common/decorateHtmlRes");

router.get("/", decorateHtmlRes("Inbox"), getInbox);

module.exports = router;
