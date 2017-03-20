/*-~- Configuration -~-*/
var PORT = 8080,    //Server Port
    PUBLIC = '/client/',    //Public Folder
/*-~- Packages -~-*/
    cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

/*-~- Server Setup -~-*/
app.use(express.static(__dirname + PUBLIC));
app.use(cors());
app.use(bodyParser.urlencoded());
 
app.get('/products/:id', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});

app.post('/contact', function(req, res) {
    console.log(req.body);
    res.type('json');
    res.json(200, {
        status: 'success',
        name: req.body.name
    });
});

//Body Parser Stuff
/* TODO
// create application/json parser 
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})
 
// POST /api/users gets JSON bodies 
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body 
})
*/
/*-~- Server Start -~-*/
var server = app.listen(PORT, function() {
    console.log(__dirname + PUBLIC);
    console.log('Server is listening on port: ' + server.address().port);
});
