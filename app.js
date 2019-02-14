const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// const morgan = require('morgan');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('combined'));
app.use(express.static('public'));
app.use('/qr_codes', express.static('qr_codes'));
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, function () {
	console.log('App listening on PORT: ' + PORT);
	console.log('http://localhost:8080');
});
