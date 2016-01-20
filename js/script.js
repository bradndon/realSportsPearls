var pearlsApp = angular.module('pearlsApp', ['ngRoute']);

$('.modal').hide();


pearlsApp.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'templates/home.html',
      controller: 'HomeCtrl'
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
}).controller('HomeCtrl', function($scope, $location) {
    $scope.form = {
        username: null,
        password: null
    };

    $scope.goCustom = function() {
      $('li a').each(function(){
        $(this).removeClass('selected');
      });
      $('.nav-customize').addClass('selected');
        $location.url('/customize');
    };
})
