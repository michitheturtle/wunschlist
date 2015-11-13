/**
 * Created by michael on 12.11.15.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http){
    $scope.signin = function(username, password){
        $http.post('/login', {username:username, password:password})
            .then(function(response){
                if(response.data.success){
                    mvNotifier.notify('You have logged in');
                }
                else
                    mvNotifier.notify('Failed to log in');
            })
    }
})