/**
 * Created by michael on 02.01.16.
 */
angular.module('app').controller('mvWunschListCtrl', function($scope, mvCachedWuensche) {
    $scope.wishes = mvCachedWuensche.query();


    $scope.getGeschenkt = function(wish){

        var sum = 0;
        for (index = 0; index < wish.geschenke.length; ++index) {
            sum += wish.geschenke[index].wert;
        }
        return sum;

    };

    $scope.getRestbetrag = function(wish){

        var result = wish.preis - $scope.getGeschenkt(wish);

        if(result < 0){
            return 0;
        }
        return result;

    };

    $scope.toDetails = function (wunsch){
        $state.go(wunschdetail({wunschId:wunsch._id}));
    };


    $scope.sortOptions = [{value:"title",text: "Sort by Title"},
        {value: "preis",text: "Sort by Price"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});