//angular.module('scotchTodo', ['todoController', 'todoService']);


angular.module('app', ['ngResource', 'ui.router']);

angular.module('app').config(function ( $locationProvider, $stateProvider, $urlRouterProvider) { //$routeProvider,

    $locationProvider.html5Mode({enabled: true, requireBase: false});
    /*$routeProvider
     .when('/', { templateUrl: 'partials/home.html', controller: 'mvMainCtrl'})
     .when('/about', { templateUrl: 'partials/about.html', controller: 'aboutController'});*/

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/home.html",
            controller: 'mvMainCtrl'
        })

        .state('about', {
            url: "/about",
            templateUrl: "partials/about.html",
            controller: 'aboutController'
        })

});


angular.module('app').controller('aboutController', function ($scope) {
    $scope.irgendwas = "fafafa";
})