const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const User = require("../../models/people");

const addUserValidator = [
	check("name")
		.isLength({ min: 1 })
		.withMessage("Name is required")
		.isAlpha("en-US", { ignore: " -" })
		.withMessage("Name must not contain anything than characters")
		.trim(),
	check("email")
		.isEmail()
		.withMessage("Invalid email address")
		.trim()
		.custom(async (value) => {
			try {
				const user = await User.findOne({ email: value });
				if (user) {
					throw createError("Email already exists");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("mobile")
		.isMobilePhone("bn-BD", { strictMode: true })
		.withMessage(
			"Mobile number must be a valid Bangladeshi mobile phone number."
		)
		.custom(async (value) => {
			try {
				const user = await User.findOne({ mobile: value });
				if (user) {
					throw createError("Number already exists");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("password")
		.isStrongPassword()
		.withMessage(
			"Password length must be 8 and contain 1 lowercase 1 uppercase 1 number & 1 symbol "
		),
];

const addUserValidatorHandler = (req, res, next) => {
	const errors = validationResult(req);
	const mappedError = errors.mapped();
	if (Object.keys(mappedError).length === 0) {
		next();
	} else {
		if (req.files.length > 0) {
			const { fileName } = req.files[0];
			unlink(
				path.json(__dirname, `/..public/uploads/avatars/${fileName}`),
				(err) => {
					if (err) console.log(err);
				}
			);
		}
		res.status(500).json({
			errors: mappedError,
		});
	}
};

module.exports = {
	addUserValidator,
	addUserValidatorHandler,
};
