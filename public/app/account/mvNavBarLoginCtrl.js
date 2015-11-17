angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location, $window) {
  $scope.identity = mvIdentity;

    $http.get('/bootstrappedUser')
        .success(function(data, status, headers, config) {
            mvIdentity.currentUser = data;

            //$window.bootstrappedUserObject = data;

        });

    $scope.signin = function(username, password) {
    mvAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        mvNotifier.notify('You have successfully signed in!');
      } else {
        mvNotifier.notify('Username/Password combination incorrect');
      }
    });
  }

  $scope.signout = function() {
    mvAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      mvNotifier.notify('You have successfully signed out!');
      $location.path('/home');
    })
  }
});