const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

login.post("/loginAdmin", async (req, res) => {
	const admin = await adminModel.findOne({ nameAdmin: req.body.nameAdmin });

	if (!admin) {
		return res.status(404).send({
			message: "Admin not found",
			statusCode: 404,
		});
	}

	const validPassword = await bcrypt.compare(req.body.password, admin.password);
	if (!validPassword) {
		return res.status(400).send({
			statusCode: 400,
			message: "Incorrect email or name",
		});
	}

	const token = jwt.sign(
		{
			nameAdmin: admin.nameAdmin,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "24h",
		}
	);
	res.header("Authorization", token).status(200).send({
		message: "Login successfully",
		statusCode: 200,
		token,
	});
});

module.exports = login;
