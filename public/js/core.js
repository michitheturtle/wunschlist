//angular.module('scotchTodo', ['todoController', 'todoService']);


angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled:true, requireBase:false});
    $routeProvider
        .when('/', { templateUrl: 'partials/home.html', controller: 'mainCtrl'})
        .when('/home', {templateUrl: 'partials/home.html',  controller: 'mainCtrl'})
        .when('/about', { templateUrl: 'partials/about.html', controller: 'aboutController'});
});

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.myVar = "Hello Angular";
});
angular.module('app').controller('aboutController', function($scope){
    $scope.irgendwas = "fafafa";
})