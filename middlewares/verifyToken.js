const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).send({
			errorType: "Threre isn't token",
			statusCode: 401,
			message: "If you want continue, you have need a valid token",
		});
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.admin = verified;

		next();
	} catch (error) {
		res.status(403).send({
			errorType: "Token error",
			statusCode: 403,
			message: "Token isn't valid",
		});
	}
};
