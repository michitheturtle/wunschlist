/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvCachedCourses', function(mvCourse) {
    var courseList;

    return {
        query: function() {
            if(!courseList) {
                courseList = mvCourse.query();
            }

            return courseList;
        }
    }
})