var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./index");
const userRouter = require('./app/user/user.route');
const processTypeRouter = require('./app/processType/processType.route');
const productRouter = require('./app/product/product.route');
// var apiRouter = require("./routes/api");
// var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

var app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "docs")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use('/apiv1',userRouter);
app.use('/processType',processTypeRouter);
app.use('/product', productRouter)
// app.use("/api/", apiRouter);

// throw 404 if URL not found
// app.all("*", function(req, res) {
// 	return apiResponse.notFoundResponse(res, "Page not found");
// });

// app.use((err, req, res) => {
// 	if(err.name == "UnauthorizedError"){
// 		return apiResponse.unauthorizedResponse(res, err.message);
// 	}
// });

module.exports = app;
