angular.module('app').factory('Brands', function ($http) {
    return {
        yes: function(){
            return true;
        },
        get: function () {
            return $http.get('/api/brands');
        },
        create: function (todoData) {
            return $http.post('/api/brands', todoData);
        },
        delete: function (id) {
            return $http.delete('/api/brands/' + id);
        }
    }
});