const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
	next(createError(404, "Not found"));
};

// default error handler
const errorHandler = (err, req, res, next) => {
	res.locals.error =
		process.env === "development" ? err : { message: err.message };
	res.status(err.status || 500);
	if (res.locals.html) {
		res.render({
			title: "error page",
		});
	} else {
		res.json(res.locals.error);
	}
};

module.exports = {
	notFoundHandler,
	errorHandler,
};
