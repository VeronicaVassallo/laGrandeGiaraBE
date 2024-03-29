const mongoose = require("mongoose");

const product = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		img: {
			type: String,
		},
		typology: {
			type: String,
			required: true,
			default: [
				"antipasti rustici",
				"antipasti di mare",
				"primi",
				"secondi",
				"contorno",
				"pizza",
				"schiacciate",
				"mezzelune",
				"dessert",
				"bibita",
				"vino",
				"birra",
			],
		},
	},
	{ timestamps: true, strict: true }
);

module.exports = mongoose.model("productSchema", product, "productTable");
