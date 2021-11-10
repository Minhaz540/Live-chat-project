const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(subfolder_path, allowed_file_types, max_file_size, err_msg) {
	// file upload folder
	const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

	const storage = multer.diskStorage({
		destination: (req, res, callback) => {
			callback(null, UPLOADS_FOLDER);
		},
		filename: (req, file, callback) => {
			const fileExt = path.extname(file.originalname);
			const fileName =
				file.originalname
					.replace(fileExt, "")
					.toLowerCase()
					.split(" ")
					.join("-") +
				"-" +
				Date.now();
			callback(null, fileName + fileExt);
		},
	});

	// fileUpload Object
	const uplaod = multer({
		storage: storage,
		limits: {
			fileSize: max_file_size,
		},
		fileFilter: (req, file, callback) => {
			if (allowed_file_types.includes(file.mimetype)) {
				callback(null, true);
			} else {
				callback(createError(err_msg));
			}
		},
	});
	return uplaod;
}

module.exports = uploader;
