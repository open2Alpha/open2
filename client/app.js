var app = angular.module('myApp', ['ngMaterial']);

// app.config(function($routeProvider) {
//   $routeProvider
//   .when("/", {
//     templateUrl: 'index.html',
//     controller: loginCtrl
//   })
//   .when('/dashboard', {
//     templateUrl: 'dashboard.html'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
// });

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
      $location.path('/dashboard');
    })
  };

  return {
    login: login
   };

 });

// var app = angular.module('myApp', ['ngMaterial', 'ui.router']);

// // app.config(function($routeProvider) {
// //   $routeProvider
// //   .when("/", {
// //     templateUrl: 'index.html'
// //   })
// //   .when('/dashboard', {
// //     templateUrl: 'dashboard.html'
// //   })
// //   .otherwise({
// //     redirectTo: '/'
// //   });
// // // });
// // app.config( function($scope, $urlRouterProvider){
// //   $urlRouterProvider.otherwise('/');

// //   $stateProvider
// //     .state('login',{
// //       url: '/login',
// //       templateUrl: 'index.html',
// //       // controller: 'loginCtrl'
// //     })
// //     .state('dashboard', {
// //       url: '/dashboard',
// //       templateUrl: 'dashboard.html'
// //     })
// // });





