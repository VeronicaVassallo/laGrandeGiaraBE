const mongoose = require("mongoose");

const admin = new mongoose.Schema(
	{
		nameAdmin: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, strict: true }
);

module.exports = mongoose.model("adminSchema", admin, "adminTable");
