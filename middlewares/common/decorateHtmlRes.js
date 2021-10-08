const decorateHtmlRes = (title) => {
	return (req, res, next) => {
		res.locals.html = true;
		res.locals.title = `${title} - chat application`;
        next();
	};
};

module.exports = decorateHtmlRes;
