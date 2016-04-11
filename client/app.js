var app = angular.module('myApp', ['ngMaterial', 'ui.router']);

// app.config(function($routeProvider) {
//   $routeProvider
//   .when("/", {
//     templateUrl: 'index.html'
//   })
//   .when('/dashboard', {
//     templateUrl: 'dashboard.html'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
// });
app.config( function($scope, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'index.html',
      // controller: 'loginCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard.html'
    })
});





app.controller('loginCtrl', function($scope) {
  $scope.submit = function() {
    var uname = $scope.username;
    var pword = $scope.password;
    console.log(uname, pword)
    if($scope.username == 'admin' && $scope.password == 'admin') {
      alert("Congrats you are ADMIn!");
    }
  };
});