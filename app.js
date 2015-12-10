var express = require('express');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

require('./mongo_user.js');
var Book = mongoose.model('Book');
var app = express();

app.use(express.static('./public'));
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));  
  
app.post('/login',function(req, res){
  res.send(req.body);
});

var Router = express.Router();

Router.route('/article')
  .get(function(req, res){
    res.end('route /article get\m');
  })
  .post(function(req, res){
    var user = req.body.user;  
    var author = req.body.author;
    res.send("User name = "+user+", password is "+author);

    var book = new Book();
    book.name = user;
    book.author = author;
    book.publishTime = new Date();

    book.save(function(err){
      console.log('save status:', err ? 'failed' : 'success');
  });
});

app.use('/api',Router);



app.listen(3001, function(){
  console.log('express running on http://localhost:3001');
});