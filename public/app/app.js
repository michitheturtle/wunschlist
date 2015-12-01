//angular.module('scotchTodo', ['todoController', 'todoService']);


angular.module('app', ['ngResource', 'ui.router']);

angular.module('app').config(function ( $locationProvider, $stateProvider, $urlRouterProvider) { //$routeProvider,

    var routeRoleChecks = {
        admin: {auth: function(mvAuth){
            return mvAuth.authorizeCurrentUserForRoute('admin')
        }}
    }


    $locationProvider.html5Mode({enabled: true, requireBase: false});

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/main/home.html",
            controller: 'mvMainCtrl'
        })

        .state('signup', {
            url: "/signup",
            templateUrl: "app/account/signup.html",
            controller: 'mvSignupCtrl'
        })

        .state('brands', {
            url: "/brands",
            templateUrl: "app/brands/home.html",
            controller: 'mvBrandCtrl'
        })

        .state('adminshowUsers', {
            url: "/showAllUsers",
            templateUrl: "app/admin/userslist.html",
            controller: 'mvUserListCtrl'
        })

        .state('about', {
            url: "/about",
            templateUrl: "app/about/about.html",
            controller: 'aboutController'
        })

});

angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not-authorized'){
            $location.path('/home');
        }
    })
})

angular.module('app').controller('aboutController', function ($scope) {
    $scope.irgendwas = "fafafa";
})