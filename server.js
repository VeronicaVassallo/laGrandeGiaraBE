const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("../laGrandeGiaraBE/routes/productRoute");
const path = require("path");

require("dotenv").config();
const cors = require("cors");
const PORT = 5050;

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/", productRouter);

mongoose.connect(process.env.MONGODB_URL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error during db connection"));
db.once("open", () => {
	console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
