
'user strict'

var cmsApp = angular.module('cmsHangookdo', ['ngRoute', 'ui.bootstrap', 'textAngular']);

cmsApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'templates/newslist.html',
		controller : 'newsListCtrl'
	}).when('/add', {
		templateUrl : 'templates/newsedit.html',
		controller : 'newsAddCtrl'
	}).when('/edit', {
		templateUrl : 'templates/newsedit.html',
		controller : 'newsEditCtrl'
	}).otherwise({redirectTo: '/'});
});

cmsApp.controller('newsListCtrl', function($scope, CMSHangookdoService, $window, $sce) {
	
	$scope.newslist = null;
	
	// Initialise news data
	$scope.promise = CMSHangookdoService.newsList();
	$scope.promise.then(function(result){
		$scope.newslist = result;
		for(key in $scope.newslist){
			$scope.newslist[key].content = $sce.trustAsHtml($scope.newslist[key].content)
		}
	});
	
	$scope.createNews = function(){
		$window.location.href = 'newseditor#/add';
	}
	
	$scope.editNews = function(newsItem){
		$window.location.href = 'newseditor#/edit?id=' + newsItem.id;
	}
	
	$scope.deleteNews = function(newsItem){

		var promise = CMSHangookdoService.deleteNews(newsItem.id);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			 alert(data);
		 });
	}
	
	$scope.backToNewsList = function(){
		$window.location.href = 'newseditor';
	}
	
});

cmsApp.controller('newsAddCtrl', function($scope, CMSHangookdoService, $window) {
	
	$scope.heading = "Add News";
	
	$scope.backToNewsList = function(){
		$window.location.href = 'newseditor';
	}
	
	$scope.submit = function(){
		var promise = CMSHangookdoService.createNews($scope.formData);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			alert('You must enter title.');
		 });
	}
});

cmsApp.controller('newsEditCtrl', function($scope, CMSHangookdoService, $window, $routeParams) {
	
	$scope.heading = "Update News";
	
	// Initialise news data
	$scope.promise = CMSHangookdoService.getNews($routeParams.id);
	
	$scope.promise.then(function(result){
		$scope.formData = result;
	});
	$scope.promise.catch(function(data){
		 alert(data);
	 });
	
	$scope.backToNewsList = function(){
		$window.location.href = 'newseditor';
	}
	
	$scope.submit = function(){
		var promise = CMSHangookdoService.updateNews($scope.formData);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			alert('You must enter title.');
		 });
	}
	
});

cmsApp.service('CMSHangookdoService', function($q, $http) {
	
	var _newsList = function() {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'GET',
			params: {sort: 'createdAt DESC'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _getNews = function(id) {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'GET',
			params: {id: id}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _createNews = function(newsItem) {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'POST',
			data: $.param(newsItem),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _updateNews = function(newsItem) {
		var deferred = $q.defer();
		
		$http({
			url: 'news/' + newsItem.id,
			method: 'PUT',
			data: $.param(newsItem),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _deleteNews = function(id) {
		var deferred = $q.defer();
		
		$http({
			url: 'news/' + id,
			method: 'DELETE'
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};

	return {
		newsList : _newsList,
		getNews: _getNews,
		createNews: _createNews,
		updateNews: _updateNews,
		deleteNews: _deleteNews
	};
});

cmsApp.factory('AuthInterceptor', function($q, $injector, $window) {
    var LocalService = $injector.get('LocalService');

    return {
      request: function(config) {
        var token;
        if (LocalService.get('hangookdo_auth_token')) {
          token = angular.fromJson(LocalService.get('hangookdo_auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('hangookdo_auth_token');
//          $injector.get('$state').go('anon.login');
          
          $window.location.href = $window.location.origin + "/#/login";
          
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });


cmsApp.factory('LocalService', function() {
	return {
		get : function(key) {
			return localStorage.getItem(key);
		},
		set : function(key, val) {
			return localStorage.setItem(key, val);
		},
		unset : function(key) {
			return localStorage.removeItem(key);
		}
	}
});