const express = require("express");
const router = express.Router();

const { getInbox } = require("../controllers/inboxController");

router.get("/users", getInbox);

module.exports = router;
