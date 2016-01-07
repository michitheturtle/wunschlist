/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory( 'mvWuensche', [ 'WuenscheResource', function( $resource ) {

    return {

        getResource: function () {
            return $resource('/api/wunschlisten/:_id', {_id: "@id"});
        },

        test: function () {
            return "testi";
        }
    }
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