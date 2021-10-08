// external imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// internal imports
const {
	errorHandler,
	notFoundHandler,
} = require("./middlewares/common/error404");
const loginRouter = require("./routers/loginRouter")

const app = express();
dotenv.config();

// Database connection
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database connection successful"))
	.catch((err) => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRETE));

// router handling
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// error handling
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// listen port
app.listen(process.env.PORT, () => {
	console.log(
		`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
	);
});
