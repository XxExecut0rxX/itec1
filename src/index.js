const express = require('express');
const app = express();
const port = 3000;

// notification messages - success - fail , etc.
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const {database} = require('./keys');

const morgan = require('morgan');
const express_hbs = require('express-handlebars');
// import { engine } from 'express-handlebars';
const path = require('path');

//settings
// app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', express_hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

// middlewares
app.use(session({
    secret: 'faztsession', 
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
})


// routes
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting server

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});