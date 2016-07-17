var express = require('express'),
app = express();

var Firebase = require("firebase");

var bodyParser = require('body-parser');

app.use(express.static('www'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var jsonParser = bodyParser.json();

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
