/**
 * Created by michael on 18.12.15.
 */
angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $stateParams) {

    console.log('courseDetailCtrl');
    console.log($stateParams.courseId);



  /*  mvCachedCourses.get()
        .success(function(data) {
            data.forEach(function(course) {
                if(course._id === $stateParams.courseId) {
                    $scope.course = course;
                }
            })
        });

*/
    mvCachedCourses.query().$promise.then(function(collection) {
        collection.forEach(function(course) {
            if(course._id === $stateParams.courseId) {
                $scope.course = course;
            }
        })
    })
});