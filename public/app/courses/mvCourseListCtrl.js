/**
 * Created by michael on 14.12.15.
 */
angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();

    console.log('coursedeList');

    $scope.sortOptions = [{value:"title",text: "Sort by Title"},
        {value: "published",text: "Sort by Publish Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});