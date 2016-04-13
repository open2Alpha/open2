var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

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

app.controller('loginCtrl', function($scope, Services) {
  $scope.submit = function() {
    var user = {
      username: $scope.username,
      password: $scope.password
    };
  Services.login(user);
  };
});

app.controller('dashboardCtrl', function($scope, Services) {
  $scope.events = {};
  Services.uploadDashboard()
  .then(function(data){
    console.log('I am dashboard data, I am already in your controllerr', data.data)
    $scope.events.fetch = true;
    $scope.events.list = data.data;
  });
});

app.controller('clickButton', function($scope, click){
  $scope.click = function(){
    click.notify({sent: "data"});
  }
})

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
    console.log(resp);
    return resp;
  });
};

return {
  login: login,
  uploadDashboard: uploadDashboard
};

});


app.factory('click', function($http) {
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
  return {
    notify: notify
  };
 });


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


//angular materials controllsre


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
})
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


