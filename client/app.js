var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

app.controller('loginCtrl', function($scope, Auth) {
  $scope.submit = function() {
    var user = {
      username: $scope.username,
      password: $scope.password
    };
    console.log(user);
    Auth.login(user);
 };
 
});

app.factory('Auth', function($http, $location) {

  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8080',
      data: user
    })
    .then(function(resp){
      console.log("I am your dashboard", resp)
      $location.path('/dashboard');
    })
    .catch(function(err){
      $location.path('/');
      console.log(err);
    })
  };

  return {
    login: login
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





