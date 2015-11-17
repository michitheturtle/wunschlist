angular.module('app', [])

	// super simple service
	// each function returns a promise object 
	.factory('Brands', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/brands');
			},
			create : function(todoData) {
				return $http.post('/api/brands', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/brands/' + id);
			}
		}
	}]);