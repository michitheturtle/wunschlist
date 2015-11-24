/**
 * Created by michael on 11.11.15.
 */
angular.module('app').controller('mvBrandCtrl', ['$scope', '$http','Brands', function($scope, $http, Brands) {

    var x = Brands.yes();

    $scope.formData = {};
    $scope.loading = true;

    $scope.brands = [{name: 'John Doe', id: '1'},
        {name: 'Mary Homes', id: '2'},
        {name: 'Chris Karl', id: '3'}
    ];


    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Brands.get()
        .success(function(data) {
            $scope.brands = data;
            $scope.loading = false;
        });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createBrand = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Brands.create($scope.formData)

                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data; // assign our new list of todos
                });
        }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteBrand= function(id) {
        $scope.loading = true;

        Brands.delete(id)
            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.loading = false;
                $scope.brands = data; // assign our new list of todos
            });
    };

   /* var init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty
    Brands.get()

    };
// and fire it after definition
    init();*/


}]);