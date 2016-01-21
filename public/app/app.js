//angular.module('scotchTodo', ['todoController', 'todoService']);


angular.module('app', ['ngResource', 'ui.router']);

angular.module('app').config(function ( $locationProvider, $stateProvider, $urlRouterProvider) { //$routeProvider,

    var routeRoleChecks = {
        admin: {auth: function(mvAuth){
            return mvAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(mvAuth){
            return mvAuth.authorizeAuthenticatedUserForRoute()
        }}
    }


    $locationProvider.html5Mode({enabled: true, requireBase: false});


    $urlRouterProvider.otherwise(function (injector) {
        event.preventDefault();
        injector.get('$state').go('wuensche');
    });

    //$urlRouterProvider.otherwise("/wuensche");

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

        .state('courses', {
            url: "/courses",
            templateUrl: "app/courses/course-list.html",
            controller: 'mvCourseListCtrl'
        })

        .state('coursesdetail', {
            url: '/courses/{courseId}',
            controller: 'mvCourseDetailCtrl',
            templateUrl: "app/courses/course-details.html",
        })

        //wunschliste
        .state('wuensche', {
            url: "/wuensche",
            templateUrl: "app/wuensche/wunsch-list.html",
            controller: 'mvWunschListCtrl'
        })

        .state('wuensche.detail', {
            url: '^/:wunschId',
            views: {
                'detail': {
                    templateUrl: 'products.detail.html',
                    controller: 'mvWunschDetailCtrl'
                }
            },
        })

        .state('wuensche.detailAsRoot', {
            url: '^/wunsch/:wunschId',
            views: {
                '@': {
                    controller: 'mvWunschDetailCtrl',
                    templateUrl: "app/wuensche/wunsch-details.html",
                }
            },

        })

        .state('myprofile', {
            url: "/myprofile",
            templateUrl: "app/account/profile.html",
            controller: 'mvProfileCtrl',
            resolve: routeRoleChecks.user
        })

        .state('adminshowUsers', {
            url: "/showAllUsers",
            templateUrl: "app/admin/userslist.html",
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
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