const express = require("express");
const productModel = require("../models/productModel");
const productRouter = express.Router();
/*GET */
productRouter.get("/product", async (req, res) => {
	try {
		const products = await productModel.find();

		res.status(200).send({
			statusCode: 200,
			message: `Found ${products.length} products`,
			products,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server error`,
			error,
		});
	}
});
/*GET */
productRouter.get("/product/:typology", async (req, res) => {
	const { typology } = req.params;
	try {
		const products = await productModel.find({
			typology: typology,
		});

		res.status(200).send({
			statusCode: 200,
			message: `Found ${products.length} products`,
			products,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server error: ${error}`,
			error,
		});
	}
});
/*POST */
productRouter.post("/product/create", async (req, res) => {
	const newProduct = new productModel({
		productName: req.body.productName,
		ingredients: req.body.ingredients,
		price: Number(req.body.price),
		img: req.body.img,
		typology: req.body.typology,
	});

	try {
		const postRequest = newProduct.save();

		res.status(201).send({
			statusCode: 201,
			message: "Product created",
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "internal server error",
		});
	}
});
module.exports = productRouter;
