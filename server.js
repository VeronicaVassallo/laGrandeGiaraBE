const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("../laGrandeGiaraBE/routes/productRoute");

require("dotenv").config();
const cors = require("cors");
const PORT = 5050;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", productRouter);

mongoose.connect(process.env.MONGODB_URL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error during db connection"));
db.once("open", () => {
	console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
