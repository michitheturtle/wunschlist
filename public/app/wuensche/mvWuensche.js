/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvWuensche', ['WuenscheResource', function ($resource) {

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

        resource.prototype.getRestbetrag = function (noCHF) {

            var result = this.preis - this.getGeschenkt(true);

            if (result < 0) {
                result = 0;
            }
            if (!noCHF)
                return this.CHF(result);
            else
                return result;

        };

        resource.prototype.getGeschenkt = function (noCHF) {

            var sum = 0;
            for (index = 0; index < this.geschenke.length; ++index) {
                sum += this.geschenke[index].wert;
            }
            if (!noCHF)
                return this.CHF(sum);
            else
                return sum;

        };

        resource.prototype.CHF = function (num) {
            return "CHF " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'")
        }

        return resource;
    };
}]);