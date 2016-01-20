var pearlsApp = angular.module('pearlsApp', ['ngRoute']);

$('.modal').hide();


pearlsApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/customize', {
      templateUrl: 'templates/customize.html',
      controller: 'CustomCtrl'

    })
    .when('/about', {
      templateUrl: 'templates/about.html'
    })
    .when('/contact', {
      templateUrl: 'templates/contact.html'
    });

  $locationProvider.html5Mode(true);
}).controller('HomeCtrl', function($scope, $location) {
  $scope.form = {
    username: null,
    password: null
  };

  $scope.goCustom = function() {
    $('li a').each(function() {
      $(this).removeClass('selected');
    });
    $('.nav-customize').addClass('selected');
    $location.url('/customize');
  };
}).controller('CustomCtrl', function($scope) {
  $scope.chosenRight = "1flip.png";
  $scope.chosenLeft = "1.png";
  $scope.radioRight = [{
    label: "Episode 1",
    val: "1flip.png"
  }, {
    label: "Episode 2",
    val: "2flip.png"
  },  {
    label: "Episode 3",
    val: "3flip.png"
  },  {
    label: "Episode 4",
    val: "4flip.png"
  },  {
    label: "Episode 5",
    val: "5flip.png"
  },  {
    label: "Episode 6",
    val: "6flip.png"
  }];
  $scope.radioLeft = [{
    label: "Episode 1",
    val: "1.png"
  }, {
    label: "Episode 2",
    val: "2.png"
  },  {
    label: "Episode 3",
    val: "3.png"
  },  {
    label: "Episode 4",
    val: "4.png"
  },  {
    label: "Episode 5",
    val: "5.png"
  },  {
    label: "Episode 6",
    val: "6.png"
  }];



});
