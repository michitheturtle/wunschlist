/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvWuensche', function($resource) {
    var WunschResource = $resource('/api/wunschlisten/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return WunschResource;
});