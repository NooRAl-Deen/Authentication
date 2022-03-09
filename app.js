const express = require('express');
const  mongoose  = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const path  = require('path');
const app = express();
const connectDB = require('./config/db');

require('./config/passport')(passport);

// Include Routes
const mainRoute = require('./routes/main.routes');
const authRoute = require('./routes/auth.routes');


// Public Dir
const publicDir = path.join(__dirname ,'./public');
app.use(express.static(publicDir));

connectDB();

app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection })
}));



// Set View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(passport.initialize());
app.use(passport.session());




app.use('/', mainRoute);
app.use('/auth', authRoute);

app.listen(5000);
