const express = require("express");
const productModel = require("../models/productModel");
const productRouter = express.Router();
//const verifyToken = require("../middlewares/verifyToken");

//cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "public",
		format: async (req, file) => "jpg",
		public_id: (req, file) => file.name,
	},
});
const cloudUpload = multer({ storage: cloudStorage });

productRouter.post(
	"/product/cloudUpload",
	cloudUpload.single("img"),
	async (req, res) => {
		try {
			res.status(200).json({ img: req.file.path });
		} catch (e) {
			res.status(500).send({
				statusCode: 500,
				message: "Internal server error" + error,
				error,
			});
		}
	}
);
/*POST*/
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

/*DELETE*/
productRouter.delete("/product/delete/:idProduct", async (req, res) => {
	const { idProduct } = req.params;

	try {
		const productToDelete = await productModel.findByIdAndDelete({
			_id: idProduct,
		});
		res.status(200).send({
			statusCode: 200,
			message: `Product with _id: ${idProduct} is deleted`,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server Error: ${error}`,
			error,
		});
	}
});

/*PUT */
productRouter.put("/product/modify/:idProduct", async (req, res) => {
	const { idProduct } = req.params;
	try {
		const productModify = await productModel.findByIdAndUpdate(idProduct, {
			productName: req.body.productName,
			ingredients: req.body.ingredients,
			price: Number(req.body.price),
			img: req.body.img,
			typology: req.body.typology,
		});

		res.status(200).send({
			statusCode: 200,
			message: `Product with id: ${idProduct} is modified`,
			productModify,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: `Internal server error: ${error}`,
			error,
		});
	}
});

module.exports = productRouter;
