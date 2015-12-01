/**
 * Created by mdi on 17.11.2015.
 */
angular.module('app').controller('mvUserListCtrl', function($scope, mvUser) {

    $scope.users = mvUser.query(function(){


    });

    $scope.bla = 'blubb';


});