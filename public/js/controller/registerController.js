angular.module('myApp').controller('registerController',function($scope,$http) {
    $scope.RegisterUsers = function() {
        data = {
            name : $scope.name,
            pass : $scope.pass,
            email : $scope.email
        }
        $http.post('/addUser', data)
        .then(function(response) {
            alert(response.data);
            $scope.clearFields();
        }, function(response) {
            alert(response.statusText);
        });
    }
    $scope.clearFields = function() {
        $scope.name = '';
        $scope.pass = '';
        $scope.email = '';
    }
});