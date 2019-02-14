// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var morgan = require("morgan");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static('public'));
app.use('/qr_codes', express.static('qr_codes'));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
	console.log("App listening on PORT: " + PORT);
	console.log('http://localhost:8080');
});
