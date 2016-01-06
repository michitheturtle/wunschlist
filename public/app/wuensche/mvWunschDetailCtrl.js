/**
 * Created by michael on 18.12.15.
 */
angular.module('app').controller('mvWunschDetailCtrl', function($scope, mvCachedWuensche, $stateParams, $state, mvNotifier) {


    mvCachedWuensche.query().$promise.then(function(collection) {
        collection.forEach(function(wish) {
            if(wish._id === $stateParams.wunschId) {
                $scope.wish = wish;
            }
        })
    })

    $scope.schenke = function() {

        var newGiftData = {
            email: $scope.email,
            name: $scope.name,
            wert: $scope.wert,
            datum: $scope.datum
        };

        //$scope.wish.geschenke.push(newGiftData);


        mvCachedWuensche.updateWunsch($scope.wish, newGiftData).then(function() {

            mvCachedWuensche.refresh();

            mvNotifier.notify('Danke für die Übermittlung!');

            $state.go('wunschliste');

        }, function(reason) {
            mvNotifier.error(reason);
        })

    }

});