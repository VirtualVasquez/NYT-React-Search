var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Article = require('./models/Article.js');
const path = require("path");
//Launch app
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Running on port: ' + port);
});

//Routes? I think? Strong use of Google-Fu here
var controller = require('./controllers/controller');
var router = new express.Router();
//defining API routes
router.get("/api/saved", controller.find);
//Save Articles
router.post("/api/saved", controller.insert);
//delete saved articles
router.delete("/api/saved/:id", controller.delete);
//send every other request to the request react app
router.get("/*", function(req,res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use(router);

//connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(db, function(error) {
	if (error) {
		console.error(error);
	}
	else {
		console.log("mongoose connection is successful");
	}
});

//start the server
app.listen(PORT, function {
	console.log('Server is now running');
});