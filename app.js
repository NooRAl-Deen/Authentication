const cookieParser = require('cookie-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const  path  = require('path');
const app = express();

// Include Routes
const mainRoute = require('./routes/main.routes');

// Public Dir
const publicDir = path.join(__dirname ,'./public');
app.use(express.static(publicDir));

// Set View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_CONNECT).then(()=>{console.log('DB Connected')}).catch((err) => {console.log(err)})

app.use('/', mainRoute);

app.listen(5000);