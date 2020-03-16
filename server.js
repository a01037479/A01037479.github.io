let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let util = require('util'); 
let app = express();
let expressHbs = require('express-handlebars');
let routes = require('./routes/routes');
let artists = [];

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', function (req,res) {
    res.render('login', { pageTitle: 'Artists App', cssPath: 'style/login.css'});
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));  // middleware

// parse application/json
app.use(bodyParser.json()); // middleware

app.use(express.static(path.join(__dirname,'public')));

app.use(routes);

app.listen(process.env.PORT || 5000);
