//'use strict';

jamatApp.factory('authInterceptorService', ['$q', '$rootScope', 'localStorageService', function ($q, $rootScope, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function(config) {

        $rootScope.$broadcast('loading:show');

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            //console.log(authData);
            var customData = localStorageService.get('userData');
            config.headers.Authorization = 'Bearer ' + authData.token;

            if (customData) {
                config.headers.userId = customData.userId;
                config.headers.roleId = customData.userRole;
            }
        }

        return config;
    };
/*
    var _requestError = function(rejection){
        return $q.reject(rejection);
    };

*/
    var _response = function(response){
        $rootScope.$broadcast('loading:hide');
        return response;
    };

    var _responseError = function (rejection) {

        if (rejection.status === 401) {
            //alert("401 status");
            console.log("unauthorized call");

            //authRepository.logOut();
            //$state.go('login');

            //$location.path('/login');
            //$window.location.href = '/login';
            //$window.location.reload();
            //$route.reload();
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    //authInterceptorServiceFactory.requestError = requestError;
    authInterceptorServiceFactory.response = _response;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
