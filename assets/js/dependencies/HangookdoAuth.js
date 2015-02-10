'user strict'

hangookdoApp.factory('AuthInterceptor', function($q, $injector, $location) {
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
          
          $location.path( "/login" );
          
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });