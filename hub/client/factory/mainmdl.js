app.factory('mainFactory', function($http, $location, $route){
  var factory = {};
  // factory.sites = [];

  function getCoordinates(address, callback) {
          geocoder.geocode({'address': address.location}, function(results, status) {
            if (status === 'OK') {
              address.lat = results[0].geometry.location.lat();
              address.lng = results[0].geometry.location.lng();
              callback(address);
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }

  factory.index = function(callback){
      $http.get('/sites/all').success(function(output){
          // factory.sites = output;
          callback(output);
      })
  }
  factory.addLocation = function(site, cb){
    var address = {
    "location": site.location,
    "ip": site.ip,
    "interval": site.interval,
    "lat": "",
    "lng": ""
}
getCoordinates(address, function(address) {
  $http.post("/site/add", address).success(function(res) {
    cb(res);
  });
});
}
  factory.deleteLocation = function(id){
      $http.post('/site/delete', {data:id}).success(function(res){
      })
  }
  factory.editLocation = function(id, data){
      $http.post('site/edit/' + id, data).success(function(res){
      })
  }
  factory.get = function(id, callback){
      $http.get('/site/' + id).success(function(output){
          factory.site = output;
          callback(output);
      })
  }
  return factory;
});
