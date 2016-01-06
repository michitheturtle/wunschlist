/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvCachedWuensche', function(mvWuensche) {
    var wunschList;

    return {
        query: function() {
            if(!wunschList) {
                wunschList = mvWuensche.getResource().query();
            }

            return wunschList;
        },
        refresh: function(){
            wunschList =  mvWuensche.getResource().query();
        }
    }
})