var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/status.html'
    })
    .when('/config', {
        templateUrl: 'partials/config.html'
    })
    .when('/edit/:id', {
        templateUrl: 'partials/edit.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});
