const express = require("express");
const adminModel = require("../models/adminModel");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");

/*POST*/
adminRouter.post("/admin/create", async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hascedPassword = await bcrypt.hash(req.body.password, salt);
	const newAdmin = new adminModel({
		nameAdmin: req.body.nameAdmin,
		password: hascedPassword,
	});

	try {
		const postAdmin = newAdmin.save();
		res.status(201).send({
			statusCode: 201,
			message: "Admin created",
			newAdmin,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `internal server error: ${error}`,
		});
	}
});

module.exports = adminRouter;
