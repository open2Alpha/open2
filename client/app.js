
var app = angular.module('myApp', ['ngMaterial', 'ngRoute', 'ngMessages']);

    //route config
  app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: 'login.html',
      controller: 'loginCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'dashboard.html'
    })
    .otherwise({
      redirectTo: '/'
    })
  });

    /// login controller
  app.controller('loginCtrl', function($scope, Services) {
    $scope.submit = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      };
    Services.login(user);
    };
  });

    // dashboard controller
app.controller('dashboardCtrl', function($scope, Services,$mdDialog, $mdMedia, $route) {
  $scope.events = {};
  Services.uploadDashboard()
  .then(function(data){
    console.log('I am dashboard data, I am already in your controllerr', data)
    $scope.events.fetch = true;
    $scope.events.list = data;
  });

  //this is our pop up dialog box

  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'inviteForm.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  //this the end of our pop up dialog box.

  $scope.time = {
       value: new Date(1970, 0, 1, 14, 57, 0)
     };
    //end of our time selector


  $scope.click = function() {
    var eventInfo = {
      'event' : $scope.user.activity,
      'time' : $scope.time.value
    }
    console.log(eventInfo);
    // console.log($scope.user.activity);
    Services.eventsPost(eventInfo)
    .then(function(respData){
       console.log('i got this back from server/database', respData);
    })
    $route.reload();
  }

});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


    // this if for Twillio
// app.controller('clickButton', function($scope, click){
//   $scope.click = function(){
//     click.notify({sent: "data"});
//   }
// })

app.factory('Services', function($http, $location) {
  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8080',
      data: user
    })
    .then(function(resp){
      $location.path('/dashboard');
    })
    .catch(function(err){
      $location.path('/');
      console.log(err);
    })
  };

var uploadDashboard = function() {
  return $http({
    method: 'GET',
    url: 'http://localhost:8080/dashboard',
  })
  .then(function(resp){
    console.log('inside uploadDashboard function', resp.data);

    return resp.data;

  });
};
 //// Twillio notification
 var notify = function(sendText){
    return $http({
      method: 'POST',
      url: 'http://localhost:8080/dashboard',
      data: sendText
    })
    .then(function(data){
      console.log("Sent the Messages", data);
    })
    .catch(function(err){
      $location.path('/');
      console.log(err);
    })
  };

   var eventsPost = function(eventInfo) {

      return $http({
        method: 'POST',
        url: 'http://localhost:8080/dashboard',
        data: eventInfo

      })

   }

return {
  login: login,
  uploadDashboard: uploadDashboard,
  notify: notify,
  eventsPost: eventsPost
};

});


// app.factory('click', function($http) {
//   var notify = function(sendText){
//     return $http({
//       method: 'POST',
//       url: 'http://localhost:8080/dashboard',
//       data: sendText
//     })
//     .then(function(data){
//       console.log("Sent the Messages", data);
//     })
//     .catch(function(err){
//       $location.path('/');
//       console.log(err);
//     })
//   };
//   return {
//     notify: notify
//   };
//  });




//angular materials controllers
//SIDE NAV

 app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
   $scope.toggleLeft = buildDelayedToggler('left');
   $scope.toggleRight = buildToggler('right');
   $scope.isOpenRight = function(){
     return $mdSidenav('right').isOpen();
   };
   /**
    * Supplies a function that will continue to operate until the
    * time is up.
    */
   function debounce(func, wait, context) {
     var timer;
     return function debounced() {
       var context = $scope,
           args = Array.prototype.slice.call(arguments);
       $timeout.cancel(timer);
       timer = $timeout(function() {
         timer = undefined;
         func.apply(context, args);
       }, wait || 10);
     };
   }
   /**
    * Build handler to open/close a SideNav; when animation finishes
    * report completion in console
    */
   function buildDelayedToggler(navID) {
     return debounce(function() {
       $mdSidenav(navID)
         .toggle()
         .then(function () {
           $log.debug("toggle " + navID + " is done");
         });
     }, 200);
   }
   function buildToggler(navID) {
     return function() {
       $mdSidenav(navID)
         .toggle()
         .then(function () {
           $log.debug("toggle " + navID + " is done");
         });
     }
   }
 })
 .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
   $scope.close = function () {
     $mdSidenav('left').close()
       .then(function () {
         $log.debug("close LEFT is done");
       });
   };
 })
 .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
   $scope.close = function () {
     $mdSidenav('right').close()
       .then(function () {
         $log.debug("close RIGHT is done");
       });
   };
 });

//NOTIFICATION BOX
app.config(function($mdThemingProvider) {
 $mdThemingProvider.theme('altTheme')
   .primaryPalette('purple');
});


app.controller('SubheaderAppCtrl', function($scope) {
   $scope.messages = [
     {
       what: 'Brunch this weekend?',
       who: 'Dain',
       when: '3:08PM',
       notes: " I'll be in your neighborhood doing errands"
     },

   ];
});



function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

 // angular.module('timeExample', [])
 //   .controller('DateController', ['$scope', function($scope) {

 //   }]);

