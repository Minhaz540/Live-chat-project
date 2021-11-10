const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/usersController");
const decorateHtmlRes = require("../middlewares/common/decorateHtmlRes");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
	addUserValidator,
	addUserValidatorHandler,
	addUsers,
} = require("../middlewares/users/usersValidator");

router.get("/", decorateHtmlRes("Users"), getUsers);

// add user
router.post(
	"/",
	avatarUpload,
	addUserValidator,
	addUserValidatorHandler,
	addUsers
);

module.exports = router;
