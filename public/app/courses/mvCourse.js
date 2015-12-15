/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvCourse', function($resource) {
    var CourseResource = $resource('/api/courses/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return CourseResource;
});