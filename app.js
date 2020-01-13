const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const session  = require('express-session');
const app = express();

//DB setup
const db = require('./config/keys').MongoURI; //Here is the require call that module.exports is looking for in keys.js

mongoose.connect(db, { useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...')) //.then is a method that exists on Promises and is a mechanism for code synchronization. 
.catch(err => console.log(err));
//Exception handling is the process of responding to the occurrence, during computation, of exceptions – anomalous or 
//exceptional conditions requiring special processing – often disrupting the normal flow of program execution.

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.


app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
//app.use('/search', require('.routes/search'))

app.use(express.static(__dirname + '/public'))

//PORT setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));