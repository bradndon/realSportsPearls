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
}).controller('CustomCtrl', function($scope, preloader) {
  // I keep track of the state of the loading images.
  $scope.isLoading = true;
  $scope.isSuccessful = false;
  $scope.percentLoaded = 0;
  // I am the image SRC values to preload and display./
  // --
  // NOTE: "cache" attribute is to prevent images from caching in the
  // browser (for the sake of the demo).
  $scope.imageLocations = [];
  $scope.radioRight = [];
  $scope.radioLeft = [];
  for (var i = 0; i < 36; i++){
    $scope.imageLocations.push("../images/Rondeles_Necklace/rneck" + (i+1) + "a.png");
    $scope.imageLocations.push("../images/Rondeles_Necklace/rnec" + (i+1) + "b.png");
    $scope.radioRight.push({label: ("Rondele " + (i+1)), val: 2*i, img: i*231, checked: false});
    $scope.radioLeft.push({label: ("Rondele " + (i+1)), val: 2*i+1, img: i*231, checked: false});
  }
  $scope.imageLocations.push(  "../images/Rondeles_Necklace/necklace_base.jpg");
  for (var i = 0; i < 36; i++){
    $scope.imageLocations.push("../images/Rondeles/rondelle" + (i+1) + ".png");
  }
  $scope.numChecked = 0;
  $scope.CheckAmount = function(){
    $scope.numChecked++;
    if ($scope.numChecked > 2){
      console.log($scope.numChecked);
      $scope.numChecked--;
      return false;
    }
    return true;
  }
  $scope.firstChosen = -1;
  $scope.secondChosen = -1
  $scope.updateSelection = function(position, entities) {
    // angular.forEach(entities, function(subscription, index) {
      subscription = entities[position];
      console.log(subscription);
      if(subscription.checked){
        if(position == $scope.secondChosen){
          $scope.secondChosen = -1;
          $scope.chosenRight = $scope.chosenLeft - 1;
        } else if (position == $scope.firstChosen && $scope.secondChosen != -1){
          $scope.firstChosen = $scope.secondChosen;
          $scope.chosenLeft = $scope.chosenRight + 1;
          $scope.secondChosen = -1;
        } else {
          $scope.firstChosen = -1;
          $scope.chosenLeft = 1;
          $scope.chosenRight = 0;

        }
      } else if($scope.secondChosen != -1) {
        $scope.chosenLeft = $scope.chosenRight + 1;
        $scope.chosenRight = subscription.val - 1;
        entities[$scope.firstChosen].checked = false;
        $scope.firstChosen = $scope.secondChosen;
        $scope.secondChosen = position;

      } else if ($scope.firstChosen != -1) {
        $scope.chosenRight = subscription.val - 1;
        $scope.secondChosen = position;
      }else {
        $scope.firstChosen = position;
        $scope.chosenLeft = subscription.val;
        $scope.chosenRight = subscription.val - 1;
      }
    // });
  }

  $scope.getLabelWidth = function(){

    var mq = window.matchMedia( "(max-width: 800px)" );
    var mq4 = window.matchMedia( "(max-device-width: 800px)" );

    var mq2 = window.matchMedia("(max-width: 620px)");
    var mq3 = window.matchMedia("(max-device-width: 620px)");


    if (mq2.matches || mq3.matches || mq.matches || mq4.matches){
      return {'width': ($('#bottom--custom').first().width())/6 + 'px'};
    }
    var newWidth = window.innerHeight / 5

    $('#content').css('width', window.innerWidth - newWidth);
    return {'width': $('#bottom--custom').first().width()/9 + 'px'};
  }
  $scope.getSpriteStyle = function(id){
    var fullWidth = 361;
    var fullHeight = 226.026;

    var ratio = (($('.rondeles').first().width()))/fullWidth;
    return 'url(' + $scope.imageLocations[73+id] + ')';}
  $scope.getImage = function(id){
    return "url(" + $scope.imageLocations[id] + ")";}
  // Preload the images; then, update display when returned.
  preloader.preloadImages( $scope.imageLocations ).then(
      function handleResolve( imageLocations ) {
          // Loading was successful.
          $scope.isLoading = false;
          $scope.isSuccessful = true;
          console.info( "Preload Successful" );
      },
      function handleReject( imageLocation ) {
          // Loading failed on at least one image.
          $scope.isLoading = false;
          $scope.isSuccessful = false;
          console.error( "Image Failed", imageLocation );
          console.info( "Preload Failure" );
      },
      function handleNotify( event ) {
          $scope.percentLoaded = event.percent;
          console.info( "Percent loaded:", event.percent );
      }
  );
  $scope.chosenRight = 0;
  $scope.chosenLeft = 1;


});

pearlsApp.factory(
           "preloader",
           function( $q, $rootScope ) {
               // I manage the preloading of image objects. Accepts an array of image URLs.
               function Preloader( imageLocations ) {
                   // I am the image SRC values to preload.
                   this.imageLocations = imageLocations;
                   // As the images load, we'll need to keep track of the load/error
                   // counts when announing the progress on the loading.
                   this.imageCount = this.imageLocations.length;
                   this.loadCount = 0;
                   this.errorCount = 0;
                   // I am the possible states that the preloader can be in.
                   this.states = {
                       PENDING: 1,
                       LOADING: 2,
                       RESOLVED: 3,
                       REJECTED: 4
                   };
                   // I keep track of the current state of the preloader.
                   this.state = this.states.PENDING;
                   // When loading the images, a promise will be returned to indicate
                   // when the loading has completed (and / or progressed).
                   this.deferred = $q.defer();
                   this.promise = this.deferred.promise;
               }
               // ---
               // STATIC METHODS.
               // ---
               // I reload the given images [Array] and return a promise. The promise
               // will be resolved with the array of image locations.
               Preloader.preloadImages = function( imageLocations ) {
                   var preloader = new Preloader( imageLocations );
                   return( preloader.load() );
               };
               // ---
               // INSTANCE METHODS.
               // ---
               Preloader.prototype = {
                   // Best practice for "instnceof" operator.
                   constructor: Preloader,
                   // ---
                   // PUBLIC METHODS.
                   // ---
                   // I determine if the preloader has started loading images yet.
                   isInitiated: function isInitiated() {
                       return( this.state !== this.states.PENDING );
                   },
                   // I determine if the preloader has failed to load all of the images.
                   isRejected: function isRejected() {
                       return( this.state === this.states.REJECTED );
                   },
                   // I determine if the preloader has successfully loaded all of the images.
                   isResolved: function isResolved() {
                       return( this.state === this.states.RESOLVED );
                   },
                   // I initiate the preload of the images. Returns a promise.
                   load: function load() {
                       // If the images are already loading, return the existing promise.
                       if ( this.isInitiated() ) {
                           return( this.promise );
                       }
                       this.state = this.states.LOADING;
                       for ( var i = 0 ; i < this.imageCount ; i++ ) {
                           this.loadImageLocation( this.imageLocations[ i ] );
                       }
                       // Return the deferred promise for the load event.
                       return( this.promise );
                   },
                   // ---
                   // PRIVATE METHODS.
                   // ---
                   // I handle the load-failure of the given image location.
                   handleImageError: function handleImageError( imageLocation ) {
                       this.errorCount++;
                       // If the preload action has already failed, ignore further action.
                       if ( this.isRejected() ) {
                           return;
                       }
                       this.state = this.states.REJECTED;
                       this.deferred.reject( imageLocation );
                   },
                   // I handle the load-success of the given image location.
                   handleImageLoad: function handleImageLoad( imageLocation ) {
                       this.loadCount++;
                       // If the preload action has already failed, ignore further action.
                       if ( this.isRejected() ) {
                           return;
                       }
                       // Notify the progress of the overall deferred. This is different
                       // than Resolving the deferred - you can call notify many times
                       // before the ultimate resolution (or rejection) of the deferred.
                       this.deferred.notify({
                           percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
                           imageLocation: imageLocation
                       });
                       // If all of the images have loaded, we can resolve the deferred
                       // value that we returned to the calling context.
                       if ( this.loadCount === this.imageCount ) {
                           this.state = this.states.RESOLVED;
                           this.deferred.resolve( this.imageLocations );
                       }
                   },
                   // I load the given image location and then wire the load / error
                   // events back into the preloader instance.
                   // --
                   // NOTE: The load/error events trigger a $digest.
                   loadImageLocation: function loadImageLocation( imageLocation ) {
                       var preloader = this;
                       // When it comes to creating the image object, it is critical that
                       // we bind the event handlers BEFORE we actually set the image
                       // source. Failure to do so will prevent the events from proper
                       // triggering in some browsers.
                       var image = $( new Image() )
                           .load(
                               function( event ) {
                                   // Since the load event is asynchronous, we have to
                                   // tell AngularJS that something changed.
                                   $rootScope.$apply(
                                       function() {
                                           preloader.handleImageLoad( event.target.src );
                                           // Clean up object reference to help with the
                                           // garbage collection in the closure.
                                           preloader = image = event = null;
                                       }
                                   );
                               }
                           )
                           .error(
                               function( event ) {
                                   // Since the load event is asynchronous, we have to
                                   // tell AngularJS that something changed.
                                   $rootScope.$apply(
                                       function() {
                                           preloader.handleImageError( event.target.src );
                                           // Clean up object reference to help with the
                                           // garbage collection in the closure.
                                           preloader = image = event = null;
                                       }
                                   );
                               }
                           )
                           .prop( "src", imageLocation )
                       ;
                   }
               };
               // Return the factory instance.
               return( Preloader );
           }
       );

       pearlsApp.directive('resize', function ($window) {
           return function (scope, element) {
               var w = angular.element($window);
               scope.getWindowDimensions = function () {
                   return {
                       'h': w.height(),
                       'w': w.width()
                   };
               };
               scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                   scope.windowHeight = newValue.h;
                   scope.windowWidth = newValue.w;

                   scope.style = function () {
                       return {
                           'height': (newValue.h - 100) + 'px',
                               'width': (newValue.w - 100) + 'px'
                       };
                   };

               }, true);

               w.bind('resize', function () {
                   scope.$apply();
               });
           }
       })
