/**
 * Created by michael on 11.11.15.
 */
angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();
});