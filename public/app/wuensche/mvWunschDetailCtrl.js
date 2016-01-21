/**
 * Created by michael on 18.12.15.
 */
angular.module('app').controller('mvWunschDetailCtrl', function($scope, mvCachedWuensche, $stateParams, $state, mvNotifier, $http) {


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
            datum: $scope.datum,
            uebermittlung: $scope.uebermittlung
        };

        //$scope.wish.geschenke.push(newGiftData);


        mvCachedWuensche.updateWunsch($scope.wish, newGiftData).then(function() {

            //POST email
            var data = $.param({
                json: JSON.stringify({
                    name: $scope.name,
                    uebermittlung: $scope.uebermittlung,
                    betrag: $scope.wert,
                    geschenkName: $scope.wish.title
                })
            });

            var serializedData = $.param({
                name: $scope.name,
                uebermittlung: $scope.uebermittlung,
                betrag: $scope.wert,
                geschenkName: $scope.wish.title
            });

            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post("/api/sendmail", serializedData)
                .success(function(data, status) {
                $scope.hello = data;
            })
                .error(function(data, status, headers, config) {
                    // this isn't happening:

                    mvNotifier.error('impossible');

                    console.debug("saved comment","");
                })

            mvCachedWuensche.refresh();

            mvNotifier.notify('Danke für die Übermittlung!');

            $state.go('wuensche');

        }, function(reason) {
            mvNotifier.error(reason);
        })

    }

});