var mongoose = require('mongoose'), path = require('path'), fs = require('fs');
var models_path = path.join(__dirname, '../models');
mongoose.connect('mongodb://localhost:27017/uptime', {
  useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected")
});

fs.readdirSync(models_path).forEach(function(file){
  if (file.indexOf('.js') >= 0){
    require(models_path + '/' + file);
  }
})
