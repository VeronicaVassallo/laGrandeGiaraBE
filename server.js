const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const adminRouter = require("./routes/adminRoute");
const loginRouter = require("./routes/login");
require("dotenv").config();

const PORT = 5050;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/", adminRouter);
app.use("/", productRoute);
app.use("/", loginRouter);

mongoose.connect(process.env.MONGODB_URL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error during db connection"));
db.once("open", () => {
	console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
