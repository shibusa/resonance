var mongoose = require('mongoose');
var Site = mongoose.model('Site');

module.exports = (function(){
  return{
      index: function(req, res){
          Site.find({}, function(err, data){
              res.json(data)
          })
      },
      addLocation: function(req, res){
          var newdata = new Site(req.body)
          newdata.save(function(err, data){
              res.json(data);
          })
      },
      deleteLocation: function(req, res){
          Site.remove({
              _id: req.body.data
          }, function(err, data) {
              if(err){
                  res.json(err);
              } else{
                  res.json(data);
              }
          })
      },
      editLocation: function(req, res){
          Site.update({_id: req.params.id}, {location: req.body.location, ip: req.body.ip, interval: req.body.interval, status: req.body.status}, function(err, data) {
              if(err){
                  res.json(err);
              } else{
                  res.json({status:true});
              }
          })
      },
      getLocation: function(req, res){
          Site.find({_id: req.params.id}, function(err, data){
              if(err){
                  res.json(err)
              } else {
                  res.json(data[0])
              }
          })
      }
  }
})();
