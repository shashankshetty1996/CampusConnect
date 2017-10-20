var app = angular.module("myApp",['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'pages/home.ejs',
        controller : 'homeController'
    })
    .when('/register', {
        templateUrl : 'pages/register.ejs',
        controller : 'registerController'
    })
    
    .when('/showUsers', {
        templateUrl : 'pages/showUsers.ejs',
        controller : 'showUsersController'
    })
    
    .otherwise({
        templateUrl : 'pages/home.ejs'
    });
});