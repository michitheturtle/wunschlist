/**
 * Created by michael on 18.12.15.
 */
angular.module('app').controller('mvWunschDetailCtrl', function($scope, mvCachedWuensche, $stateParams) {



  /*  mvCachedCourses.get()
        .success(function(data) {
            data.forEach(function(course) {
                if(course._id === $stateParams.courseId) {
                    $scope.course = course;
                }
            })
        });

*/
    mvCachedWuensche.query().$promise.then(function(collection) {
        collection.forEach(function(wish) {
            if(wish._id === $stateParams.wunschId) {
                $scope.wish = wish;
            }
        })
    })

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('Danke für die Übermittlung!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }

});