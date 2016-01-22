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
  $scope.chosenRight = "rnec1b.png";
  $scope.chosenLeft = "rneck1a.png";
  $scope.radioRight = [{
    label: "Episode 1",
    val: "rnec1b.png"
  }, {
    label: "Episode 2",
    val: "rnec2b.png"
  },  {
    label: "Episode 3",
    val: "rnec3b.png"
  },  {
    label: "Episode 4",
    val: "rnec4b.png"
  },  {
    label: "Episode 5",
    val: "rnec5b.png"
  },  {
    label: "Episode 6",
    val: "rnec6b.png"
  }];
  $scope.radioLeft = [{
    label: "Episode 1",
    val: "rneck1a.png"
  }, {
    label: "Episode 2",
    val: "rneck2a.png"
  },  {
    label: "Episode 3",
    val: "rneck3a.png"
  },  {
    label: "Episode 4",
    val: "rneck4a.png"
  },  {
    label: "Episode 5",
    val: "rneck5a.png"
  },  {
    label: "Episode 6",
    val: "rneck6a.png"
  }];



});
