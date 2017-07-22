app.controller('mainController', ['$scope', '$route', '$routeParams', '$location', 'mainFactory', function($scope, $route, $routeParams, $location, mainFactory){
    if (!$scope.sites) {$scope.sites = [];}
    $scope.statusList = ["Online", "Offline", "Maintenance"];
    var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    if($routeParams.id){
        mainFactory.get($routeParams.id, function(data){
            $scope.site = data;
        })
    }
    mainFactory.index(function(data){
      setMapOnAll(null);
        $scope.sites = data;
        var location;
              for (key in data) {
                icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                location = {lat: parseFloat(data[key].lat), lng: parseFloat(data[key].lng)};
                if (data[key].status=="Online") {
                  icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }
                var marker = new google.maps.Marker({
                  map: map,
                  position: location,
                  title: data[key].location,
                  label: data[key].location,
                  icon: icon,
                  animation: google.maps.Animation.DROP
                });
                markers.push(marker);
              }
              location = {lat: parseFloat(data[data.length-1].lat), lng: parseFloat(data[data.length-1].lng)};
              // map.setCenter(location);
    })
    $scope.addLocation = function(){
        mainFactory.addLocation($scope.newSite, function(res) {
              $scope.newSite = {};
              $route.reload();
        });
    }
    $scope.deleteLocation = function(_id){
        mainFactory.deleteLocation(_id)
        $route.reload();
    }
    $scope.editLocation = function(_id){
        mainFactory.editLocation(_id, $scope.site);
        $location.url('/config')
    }
}]);
