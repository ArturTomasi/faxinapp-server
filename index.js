var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var secrets = require('./secrets.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send("Faxinapp");
});

app.post('/share/', function (req, res) {

    if (req.header('api_key') === secrets.api_key) {
        var product = req.body;

        fs.writeFile('./shared/' + product.uuid + ".json", JSON.stringify(product), "utf8", function () {
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(401);
    }
});

app.get('/obtain/:id', function (req, res) {

    if (req.header('api_key') === secrets.api_key) {
        var uuid = req.params.id;
        var path = './shared/' + uuid + '.json';

        try {
            if (fs.existsSync(path)) {
                res.setHeader("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(require(path)));
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus('401');
    }
});

app.get('/helper/', function (req, res) {

    var array = [];
    
    fs.readdirSync( "shared").forEach( function( file ) {
        array.push( file);
    });
    
    var data = { "shared" : array };

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
} );


const server = app.listen(process.env.PORT || 8080, function () {
    var dir = 'shared';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    dir = 'concluded';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log('http://' + server.address().address + ":" + server.address().port);
});