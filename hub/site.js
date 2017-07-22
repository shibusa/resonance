#!/usr/bin/env node
var express = require('express'), path = require('path'), bodyParser = require('body-parser');
var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'client')));

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(port, function(){
  console.log('Listening on port ' + port);
})
