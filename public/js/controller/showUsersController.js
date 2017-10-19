angular.module('myApp').controller('showUsersController',function($scope,$http,$interval) {
    $scope.displayUsers = function () {
        $http.get('/showUserAPI').then(function(response){
            $scope.users = response.data;
        },function(response){
            alert(response.statusText);
        });
    }
    $scope.displayUsers();
    $interval(function () {
        $scope.displayUsers()
    }, 60000);

});