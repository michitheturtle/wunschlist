/**
 * Created by michael on 14.12.15.
 */
angular.module('app').factory('mvCachedWuensche', function (mvWuensche, $q) {
    var wunschList;

    return {
        query: function () {
            if (!wunschList) {
                wunschList = mvWuensche.getResource().query();

            }

            return wunschList;
        },
        refresh: function () {
            wunschList = mvWuensche.getResource().query();
        },
        updateWunsch: function (wunsch, gift) {
            var dfd = $q.defer();

            //var clone = angular.copy(mvIdentity.currentUser);
            //angular.extend(clone, newUserData);

            /*if (gift.wert === 0.12) {
             dfd.reject("nooooo");
             }*/

            mvWuensche.getResource().get({_id: wunsch._id}, function (theWish) {
                theWish.geschenke.push(gift);

                var sum = 0;
                theWish.geschenke.forEach(function (gesch) {
                    sum = sum + gesch.wert;
                });
                if (sum >= theWish.preis) {
                    theWish.erfuellt = 'true';
                    theWish.offenerBetrag = 0;
                    theWish.bisherGeschenkt = theWish.preis;
                }
                else{
                    theWish.bisherGeschenkt = sum;
                    theWish.offenerBetrag = theWish.preis - sum;
                }

                theWish.$save().then(function () {
                    dfd.resolve();
                }, function (response) {
                    console.log(response.data.reason);
                    dfd.reject(response.data.reason);
                });

            });



            return dfd.promise;
        },
    }
})