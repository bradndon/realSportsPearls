var pearlsApp = angular.module('pearlsApp', ['ngRoute']);

pearlsApp.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'templates/home.html'
    })
    .when('/customize', {
      templateUrl : 'templates/customize.html'
    })
    .when('/about', {
      templateUrl : 'templates/about.html'
    })
    .when('/contact', {
      templateUrl : 'templates/contact.html'
    });

    $locationProvider.html5Mode(true);
});
