const mongoose = require("mongoose");

const pizza = new mongoose.Schema(
	{
		pizzaName: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		typology: {
			type: String,
			required: true,
			default: ["rossa", "bianca"],
		},
	},
	{ timestamps: true, strict: true }
);

module.exports = mongoose.model("pizzaSchema", pizza, "pizzaTable");
