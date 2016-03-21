var pearlsApp = angular.module('pearlsApp', ['ngRoute']);

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
      templateUrl: 'templates/about.html',
      controller: 'AboutCtrl'
    })
    .when('/contact', {
      templateUrl: 'templates/contact.html'
    });

  $locationProvider.html5Mode(true);
}).controller('HomeCtrl', function($scope, $location, resize, preloader, Loaded) {
  $scope.isLoading = Loaded.getLoad();

  if(!$scope.isLoading){
    $("#loading").css("display","none");

    $("#content--home").css("display","block");

    $(".nav--main").css("display","block");
    resize.onstart();

    }
  var red = document.getElementById('red');

  var screenWidth = window.screen.width;
  red.style.height = screenWidth*.15 + "px";

  console.log(screenWidth*.15);
  red.style.width = screenWidth*.15 + "px";
  red.style.top = "-4px";
  $('.nav__link--mobile').click(function(event) {
    $(this).parent().parent().slideUp();
  });
  $('.nav__link--change').off();
  $('.nav__link--change').click(function(event) {
    event.preventDefault();
    $self = $(this);
    if ($location.url() != $self.attr('href')) {
      $('#content').animate({
        opacity: "0"
      }, function() {
        //now get the anchor href and redirect the browser
        $location.url($self.attr('href'));
        $scope.$apply();

      });
    }
  });

  $(window).on("resize.doResize", resize.resize);
  $scope.$on("$destroy", function() {
    $(window).off("resize.doResize"); //remove the handler added earlier
  });

  $('.nav__link').each(function() {
    $(this).removeClass('nav__link--selected');
  });
  $('.nav-home').addClass('nav__link--selected');

  $scope.goCustom = function() {
    $location.url('/customize');
  };
  // I keep track of the state of the loading images.
  $scope.isLoading = Loaded.getLoad();
  $scope.isSuccessful = false;
  $scope.percentLoaded = 0;
  // I am the image SRC values to preload and display.
  $scope.imageLocations = [];
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles_Necklace/rneck" + (i + 1) + "a.png");
    $scope.imageLocations.push("../images/Rondeles_Necklace/rnec" + (i + 1) + "b.png");
  }
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles/rondelle" + (i + 1) + ".png");
  }
  $scope.imageLocations.push("../images/Rondeles_Necklace/necklace_base.jpg");
  $scope.imageLocations.push("../images/logo.jpg");
  $scope.imageLocations.push("../images/main.jpg");
  $scope.imageLocations.push("../images/mannequin.png");
  $scope.imageLocations.push("../images/paypal.png");
  $scope.imageLocations.push("../images/pearls.png");
  // Preload the images; then, update display when returned.
  if ($scope.isLoading) {
    preloader.preloadImages($scope.imageLocations).then(
      function handleResolve(imageLocations) {
        // Loading was successful.
        $scope.isLoading = Loaded.setLoad(false);
        $("#loading").css("display","none");

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        $scope.isSuccessful = true;
      },
      function handleReject(imageLocation) {
        // Loading failed on at least one image.
        $scope.isLoading = Loaded.setLoad(false);
        $scope.isSuccessful = false;
        $("#loading").fadeOut();

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        console.error("Image Failed", imageLocation);
        console.info("Preload Failure");
      },
      function handleNotify(event) {
        $scope.percentLoaded = event.percent;
        red.style.height = (parseInt(red.style.height, 10) - 2) + "px";
        red.style.top = (parseInt(red.style.top, 10) - 2) + "px";
      }
    );
  }

}).controller('AboutCtrl', function($scope, $location, resize, preloader, Loaded) {
  $scope.isLoading = Loaded.getLoad();

  if(!$scope.isLoading){
    $("#loading").css("display","none");

    $("#content--home").css("display","block");

    $(".nav--main").css("display","block");
    resize.onstart();

    }
  var red = document.getElementById('red');

  var screenWidth = window.screen.width;
  red.style.height = screenWidth*.15 + "px";

  console.log(screenWidth*.15);
  red.style.width = screenWidth*.15 + "px";
  red.style.top = "-4px";
  $('.nav__link--mobile').click(function(event) {
    $(this).parent().parent().slideUp();
  });
  $('.nav__link--change').off();
  $('.nav__link--change').click(function(event) {
    event.preventDefault();
    $self = $(this);
    if ($location.url() != $self.attr('href')) {
      $('#content').animate({
        opacity: "0"
      }, function() {
        //now get the anchor href and redirect the browser
        $location.url($self.attr('href'));
        $scope.$apply();

      });
    }
  });

  $(window).on("resize.doResize", resize.resize);
  $scope.$on("$destroy", function() {
    $(window).off("resize.doResize"); //remove the handler added earlier
  });

  $('.nav__link').each(function() {
    $(this).removeClass('nav__link--selected');
  });
  $('.nav-about').addClass('nav__link--selected');
  $scope.isSuccessful = false;
  $scope.percentLoaded = 0;
  // I am the image SRC values to preload and display.
  $scope.imageLocations = [];
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles_Necklace/rneck" + (i + 1) + "a.png");
    $scope.imageLocations.push("../images/Rondeles_Necklace/rnec" + (i + 1) + "b.png");
  }
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles/rondelle" + (i + 1) + ".png");
  }
  $scope.imageLocations.push("../images/Rondeles_Necklace/necklace_base.jpg");
  $scope.imageLocations.push("../images/logo.jpg");
  $scope.imageLocations.push("../images/main.jpg");
  $scope.imageLocations.push("../images/mannequin.png");
  $scope.imageLocations.push("../images/paypal.png");
  $scope.imageLocations.push("../images/pearls.png");


  if ($scope.isLoading) {
    preloader.preloadImages($scope.imageLocations).then(
      function handleResolve(imageLocations) {
        // Loading was successful.
        $scope.isLoading = Loaded.setLoad(false);
        $("#loading").css("display","none");

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        $scope.isSuccessful = true;
      },
      function handleReject(imageLocation) {
        // Loading failed on at least one image.
        $scope.isLoading = Loaded.setLoad(false);
        $scope.isSuccessful = false;
        $("#loading").fadeOut();

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        console.error("Image Failed", imageLocation);
        console.info("Preload Failure");
      },
      function handleNotify(event) {
        $scope.percentLoaded = event.percent;
        red.style.height = (parseInt(red.style.height, 10) - 2) + "px";
        red.style.top = (parseInt(red.style.top, 10) - 2) + "px";
      }
    );
  }

}).controller('CustomCtrl', function($scope, $location, preloader, resize, Customizer, Loaded) {
  $scope.isLoading = Loaded.getLoad();

  if(!$scope.isLoading){
    $("#loading").css("display","none");

    $("#content--home").css("display","block");

    $(".nav--main").css("display","block");
    resize.onstart();

    }
  var red = document.getElementById('red');

  var screenWidth = window.screen.width;
  red.style.height = screenWidth*.15 + "px";

  console.log(screenWidth*.15);
  red.style.width = screenWidth*.15 + "px";
  red.style.top = "-4px";
  $('.nav__link--change').off();

  $('.nav__link--change').click(function(event) {
    event.preventDefault();
    $self = $(this);
    if ($location.url() != $self.attr('href')) {
      $('#content').animate({
        opacity: "0"
      }, function() {
        //now get the anchor href and redirect the browser
        $location.url($self.attr('href'));
        $scope.$apply();

      });
    }
  });
  $('.nav__link--mobile').click(function(event) {
    $(this).parent().parent().slideUp();
  });

  $(window).on("resize.doResize", resize.resize);
  $scope.$on("$destroy", function() {
    $(window).off("resize.doResize"); //remove the handler added earlier
  });

  $('.nav__link').each(function() {
    $(this).removeClass('nav__link--selected');
  });

  $('.nav-customize').addClass('nav__link--selected');

  $scope.getLabelWidth = function() {
    var mq = window.matchMedia("(max-width: 800px)");
    var mq4 = window.matchMedia("(max-device-width: 800px)");
    var mq2 = window.matchMedia("(max-width: 620px)");
    var mq3 = window.matchMedia("(max-device-width: 620px)");
    if (mq2.matches || mq3.matches || mq.matches || mq4.matches) {
      return {
        'width': ($('.bottom--custom').width() / 6) + 'px'
      };
    }
    var newWidth = window.innerHeight / 5
    return {
      'width': $('.bottom--custom').width() / 9 + 'px'
    };
  }
  $scope.getSpriteStyle = function(id) {
    return 'url(' + $scope.imageLocations[72 + id] + ')';
  }
  $scope.getImage = function(id) {
    return "url(" + $scope.imageLocations[id] + ")";
  }
  $scope.updateSelection = function(position, entities) {
    Customizer.updateSelection(position, entities);
    $scope.chosenLeft = Customizer.getLeft();
    $scope.chosenRight = Customizer.getRight();
    if ($scope.chosenRight != -1 || $scope.chosenLeft != -1) {
      $scope.isDisabled = false;
    } else {
      $scope.isDisabled = true;
    }
  }
  $scope.isDisabled = false;
  $scope.chosenRight = Customizer.getLeft();
  $scope.chosenLeft = Customizer.getRight();
  if ($scope.chosenRight != -1 || $scope.chosenLeft != -1) {
    $scope.isDisabled = false;
  } else {
    $scope.isDisabled = true;
  }
  // I keep track of the state of the loading images.
  $scope.isLoading = Loaded.getLoad();
  $scope.isSuccessful = false;
  $scope.percentLoaded = 0;
  // I am the image SRC values to preload and display.
  $scope.imageLocations = [];
  $scope.radioLeft = [];
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles_Necklace/rneck" + (i + 1) + "a.png");
    $scope.imageLocations.push("../images/Rondeles_Necklace/rnec" + (i + 1) + "b.png");
    if (i * 2 == $scope.chosenLeft || 2 * i + 1 == $scope.chosenRight) {
      $scope.radioLeft.push({
        val: 2 * i + 1,
        checked: true
      });
    } else {
      $scope.radioLeft.push({
        val: 2 * i + 1,
        checked: false
      });
    }
  }
  for (var i = 0; i < 36; i++) {
    $scope.imageLocations.push("../images/Rondeles/rondelle" + (i + 1) + ".png");
  }
  $scope.imageLocations.push("../images/Rondeles_Necklace/necklace_base.jpg");
  $scope.imageLocations.push("../images/logo.png");
  $scope.imageLocations.push("../images/main.png");
  $scope.imageLocations.push("../images/mannequin.png");
  $scope.imageLocations.push("../images/paypal.png");
  $scope.imageLocations.push("../images/pearls.png");
  // Preload the images; then, update display when returned.
  if ($scope.isLoading) {
    preloader.preloadImages($scope.imageLocations).then(
      function handleResolve(imageLocations) {
        // Loading was successful.
        $scope.isLoading = Loaded.setLoad(false);
        $("#loading").css("display","none");

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        $scope.isSuccessful = true;
      },
      function handleReject(imageLocation) {
        // Loading failed on at least one image.
        $scope.isLoading = Loaded.setLoad(false);
        $("#loading").css("display","none");

        $("#content--home").fadeIn();

        $(".nav--main").fadeIn();
        resize.onstart();

        $scope.isSuccessful = true;
        console.error("Image Failed", imageLocation);
        console.info("Preload Failure");
      },
      function handleNotify(event) {
        red.style.height = (parseInt(red.style.height, 10) - 2) + "px";
        red.style.top = (parseInt(red.style.top, 10) - 2) + "px";
        $scope.percentLoaded = event.percent;
      }
    );
  }
}).controller('CheckoutCtrl', function($scope, preloader, resize, Customizer) {
  $scope.price = 180.00;
  $scope.earring = true;
  $scope.earringLength = 0;
  $scope.earringStyle = "A";
  $scope.titles = ["CHOOSE YOUR LENGTH", "WOULD YOU LIKE EARRINGS?", "WHICH STYLE?"];
  $scope.currPage = 1;
  $scope.title = $scope.titles[$scope.currPage - 1];
  $scope.checkout = function() {
    var value = "First Color: " + (Customizer.getLeft() + 1) / 2 + " Second Color: " + ((Customizer.getRight() / 2) + 1);
    if ($scope.earringLength > 0) {
      value += " - Earring : " + $scope.earringStyle + " ";
      if ($scope.earringLength == 80) {
        value += "3 Pearls"
      } else {
        value += "5 Pearls"
      }
    }

    if ($scope.price == 180.00) {
      value += " - 16 inch Necklace"
    } else if ($scope.price == 187.50) {
      value += " - 18 inch Necklace"
    } else {
      value += " - 20 inch Necklace"
    }

    document.getElementById("item_name").value = value;
    document.getElementById("amount").value = $scope.price + $scope.earringLength;

  }
  $scope.continueCheckout = function() {
    if ($scope.price == 0) {
      $scope.currPage = 3;
    } else {
      $scope.currPage++;
    }
    $scope.title = $scope.titles[$scope.currPage - 1];
    if ($scope.currPage == 3) {
      $scope.earringLength = 80.00;
      $scope.earring = false;
    }
  }
  $scope.resetCheckout = function() {
    $('.modal').fadeOut(200);
    $('.checkout').fadeOut(200, function() {
      $scope.earringLength = 0;
      $scope.earring = true;
      $scope.currPage = 1;
      $scope.title = $scope.titles[$scope.currPage - 1];
      $scope.$apply()
    });
  }
});
pearlsApp.factory("resize", function() {
  return {
    resize: function() {
      console.log("RESIZE");

      var div = $('.nav--main');

      var mq2 = window.matchMedia("(max-width: 620px)");
      var mq3 = window.matchMedia("(max-device-width: 620px)");

      var newWidth = window.innerHeight / 5
      div.css('width', newWidth);
      var content = $('#content');
      if (document.body.scrollHeight > document.body.clientHeight) {
        content.css('width', window.innerWidth - 15 - newWidth);
      } else {
        content.css('width', window.innerWidth - newWidth);
      }
      if (mq2.matches || mq3.matches) {
        content.css('width', window.innerWidth);
      }
    },
    onstart: function() {
      console.log("ONSTART");
      $('.modal').fadeOut(200);
      $('.checkout').fadeOut(200);
      $('.contactform').fadeOut(200);
      var mq = window.matchMedia("(max-width: 800px)");
      var mq4 = window.matchMedia("(max-device-width: 800px)");
      var mq2 = window.matchMedia("(max-width: 620px)");
      var mq3 = window.matchMedia("(max-device-width: 620px)");
      var div = $('.nav--main');
      var newWidth = window.innerHeight / 5
      div.css('width', newWidth);
      var content = $('#content');
      $('#bottom').css('height', newWidth * 2);
      if (document.body.scrollHeight > document.body.clientHeight && !(mq.matches || mq4.matches)) {
        content.css('width', window.innerWidth - 15 - newWidth);
      } else {
        content.css('width', window.innerWidth - newWidth);
      }
      if (mq2.matches || mq3.matches) {
        if (document.body.scrollHeight > document.body.clientHeight) {
          content.css('width', window.innerWidth);
        } else {
          content.css('width', window.innerWidth);
        }
      }
    }
  }
});

pearlsApp.service("Customizer", function() {
  var firstChosen = -1;
  var secondChosen = -1
  var chosenLeft = -1;
  var chosenRight = -1;
  this.getLeft = function() {
    return chosenLeft;
  }
  this.getRight = function() {
    return chosenRight;
  }
  this.updateSelection = function(position, entities) {
    // angular.forEach(entities, function(subscription, index) {
    subscription = entities[position];
    if (subscription.checked) {
      if (position == secondChosen) {
        secondChosen = -1;
        chosenRight = chosenLeft - 1;
      } else if (position == firstChosen && secondChosen != -1) {
        firstChosen = secondChosen;
        chosenLeft = chosenRight + 1;
        secondChosen = -1;
      } else {
        firstChosen = -1;
        chosenLeft = 1;
        chosenRight = 0;
      }
    } else if (secondChosen != -1) {
      chosenLeft = chosenRight + 1;
      chosenRight = subscription.val - 1;
      entities[firstChosen].checked = false;
      firstChosen = secondChosen;
      secondChosen = position;
    } else if (firstChosen != -1) {
      chosenRight = subscription.val - 1;
      secondChosen = position;
    } else {
      firstChosen = position;
      chosenLeft = subscription.val;
      chosenRight = subscription.val - 1;
    }
    if (firstChosen == -1 && secondChosen == -1) {
      chosenLeft = -1;
      chosenRight = -1;
      // $('.top__overlay').css('opacity', 1.0);
      // $(".top__buybtn").prop('disabled', true);
    } else {
      // $('.top__overlay').css('opacity', 0.3);
      // $(".top__buybtn").prop('disabled', false);
    }
  }
})

//from http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
pearlsApp.factory(
  "preloader",
  function($q, $rootScope) {
    // I manage the preloading of image objects. Accepts an array of image URLs.
    function Preloader(imageLocations) {
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
    Preloader.preloadImages = function(imageLocations) {
      var preloader = new Preloader(imageLocations);
      return (preloader.load());
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
        return (this.state !== this.states.PENDING);
      },
      // I determine if the preloader has failed to load all of the images.
      isRejected: function isRejected() {
        return (this.state === this.states.REJECTED);
      },
      // I determine if the preloader has successfully loaded all of the images.
      isResolved: function isResolved() {
        return (this.state === this.states.RESOLVED);
      },
      // I initiate the preload of the images. Returns a promise.
      load: function load() {
        // If the images are already loading, return the existing promise.
        if (this.isInitiated()) {
          return (this.promise);
        }
        this.state = this.states.LOADING;
        for (var i = 0; i < this.imageCount; i++) {
          this.loadImageLocation(this.imageLocations[i]);
        }
        // Return the deferred promise for the load event.
        return (this.promise);
      },
      // ---
      // PRIVATE METHODS.
      // ---
      // I handle the load-failure of the given image location.
      handleImageError: function handleImageError(imageLocation) {
        this.errorCount++;
        // If the preload action has already failed, ignore further action.
        if (this.isRejected()) {
          return;
        }
        this.state = this.states.REJECTED;
        this.deferred.reject(imageLocation);
      },
      // I handle the load-success of the given image location.
      handleImageLoad: function handleImageLoad(imageLocation) {
        this.loadCount++;
        // If the preload action has already failed, ignore further action.
        if (this.isRejected()) {
          return;
        }
        // Notify the progress of the overall deferred. This is different
        // than Resolving the deferred - you can call notify many times
        // before the ultimate resolution (or rejection) of the deferred.
        this.deferred.notify({
          percent: Math.ceil(this.loadCount / this.imageCount * 100),
          imageLocation: imageLocation
        });
        // If all of the images have loaded, we can resolve the deferred
        // value that we returned to the calling context.
        if (this.loadCount === this.imageCount) {
          this.state = this.states.RESOLVED;
          this.deferred.resolve(this.imageLocations);
        }
      },
      // I load the given image location and then wire the load / error
      // events back into the preloader instance.
      // --
      // NOTE: The load/error events trigger a $digest.
      loadImageLocation: function loadImageLocation(imageLocation) {
        var preloader = this;
        // When it comes to creating the image object, it is critical that
        // we bind the event handlers BEFORE we actually set the image
        // source. Failure to do so will prevent the events from proper
        // triggering in some browsers.
        var image = $(new Image())
          .load(
            function(event) {
              // Since the load event is asynchronous, we have to
              // tell AngularJS that something changed.
              $rootScope.$apply(
                function() {
                  preloader.handleImageLoad(event.target.src);
                  // Clean up object reference to help with the
                  // garbage collection in the closure.
                  preloader = image = event = null;
                }
              );
            }
          )
          .error(
            function(event) {
              // Since the load event is asynchronous, we have to
              // tell AngularJS that something changed.
              $rootScope.$apply(
                function() {
                  preloader.handleImageError(event.target.src);
                  // Clean up object reference to help with the
                  // garbage collection in the closure.
                  preloader = image = event = null;
                }
              );
            }
          )
          .prop("src", imageLocation);
      }
    };
    // Return the factory instance.
    return (Preloader);
  }
);
pearlsApp.service('Loaded', function() {
  load = true;
  imageLocations = [];
  this.getLoad = function() {
    return load;
  }
  this.setLoad = function(value) {
    load = value;
    return value;
  }
});

function contactus() {
  var valid = true;
  if ($("#contactmessage").val() === "") {
    $("#contactmessage").addClass("contactform__text--invalid");
    $("#contactmessage").focus();
    valid = false;
  } else {
    $("#contactmessage").removeClass("contactform__text--invalid");

  }
  if ($("#contactemail").val() === "") {
    $("#contactemail").addClass("contactform__text--invalid");
    $("#contactemail").focus();
    valid = false;
  } else {
    $("#contactemail").removeClass("contactform__text--invalid");

  }
  if ($("#contactname").val() === "") {
    $("#contactname").addClass("contactform__text--invalid");
    $("#contactname").focus();
    valid = false;
  } else {
    $("#contactname").removeClass("contactform__text--invalid");

  }
  if (valid) {
    $.post("templates/contact-form-handler.php", {
        name: $("#contactname").val(),
        email: $("#contactemail").val(),
        message: $("#contactmessage").val()
      })
      .done(function(data) {
        $('.modal').fadeOut(200);
        $('.contactform').fadeOut(200);
      });
  }
}
