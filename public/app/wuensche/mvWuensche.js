/**
 * Created by michael on 14.12.15.
 */
/*
angular.module('app').factory('mvWuensche', function ($resource) {
    var resource = $resource('/api/wunschlisten/:_id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return resource;
});
*/
angular.module('app').factory( 'mvWuensche', [ 'WuenscheResource', function( $resource ) {
       return  return {
        getResource: function(){
            $resource('/api/wunschlisten/:_id', {_id: "@id"} );
        }}
     }]);

angular.module('app').factory('WuenscheResource', ['$resource', function ($resource) {
    return function (url, params, methods) {
        var defaults = {
            update: {method: 'put', isArray: false},
            create: {method: 'post'}
        };

        methods = angular.extend(defaults, methods);

        var resource = $resource(url, params, methods);

        resource.prototype.$save = function () {
            if (!this._id) {
                return this.$create();
            }
            else {
                return this.$update();
            }
        };

        return resource;
    };
}]);