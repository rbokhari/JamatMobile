﻿//'use strict';
jamatApp.factory('authRepository', [
    '$http', '$q', 'accountRepository', 'localStorageService','SERVICE',
    function ($http, $q, accountRepository, localStorageService, SERVICE) {

        var serviceBase = SERVICE.BASE_ADDRESS; //  'http://amc.azurewebsites.net/'; //'http://localhost:91/';
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            tajneedId: 0,
            userName: "",
            fullName: "",
            departmentName: "",
            departmentId: 0,
            empPicture: "",
            email: "",
            phone: "",
            roles: "",
            roleId: "",
            moduleId: "",
            isHRMSModule: false,
            isINVModule: false,
            isSystemAdmin: false,
            isHRMSAdmin: false,
            isHRMSUser: false,
            isINVAdmin: false,
            isINVUser: false
        };

        //var _saveRegistration = function (registration) {
        //    _logOut();
        //    return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //        return response;
        //    });
        //};

        var _lockLogin = function (loginData) {

            var deferred = $q.defer();

            $http.post(serviceBase + '/api/account/?userName=' + loginData.userName + '&password=' + loginData.password)
                .success(function (response) {

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

            return deferred.promise;

        };

        var _login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            accountRepository.getUserByUserName(loginData.userName, loginData.password)
                .$promise
                .then(function(res) {

                    if (res.userId) {
                        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                            .success(function(response) {
                            //console.log("token done");
                            //console.log(response.access_token);
                            
                            localStorageService.set('authorizationData', { token: response.access_token, userId: res.tajneedId, role: "role" });
                            localStorageService.set('userData', { userId: res.tajneedId, userRole: 0 });

                            deferred.resolve(res);

                        }).error(function(err, status) {
                            console.log("inner error " + err + " status " + status);
                            _logOut();
                            deferred.reject(err);
                        });
                    } else {
                        deferred.reject(res);
                    }
                    //deferred.resolve(res);
                }, function(error) {

                    console.log("error is : " + error);
                    //alert("not done");
                    //$scope.message = "User not allowed to login this system.";
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var _logOut = function () {

            //console.log("logOut from System");

            localStorageService.remove('authorizationData');
            localStorageService.remove('userData');
            
            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {

            var deferred = $q.defer();
            var authData = ""; // localStorageService.get('authorizationData');

            if (authData != null) {
                $http.get('/api/tajneed/GetEmployeeByUserName/?userName=' + authData.userName)
                    .success(function (response) {

                        _authentication.isAuth = true;
                        _authentication.userName = response.userName;
                        _authentication.fullName = response.employeeName;
                        _authentication.employeeId = response.id;
                        _authentication.departmentName = response.postedTo;
                        _authentication.empPicture = response.empPicture;
                        _authentication.email = response.email;
                        _authentication.phone = response.phone;

                    }).error(function (err, status) {
                        //_logOut();
                        console.log(err);
                        deferred.reject(err);
                    });
            } else {
                deferred.reject();
            }
            return deferred.promise;


            //var authData = localStorageService.get('authorizationData');

            //if (authData) {
            //    //console.log("authData.yes :(" + authData + ")");
            //    //var employeeData = employeeRepository.getEmployeeDetailByUserName(authData.userName);
            //    employeeDataPost(authData.userName);
            //    //console.log(_authentication);

            //    //_authentication.isAuth = true;
            //}
        };

        function employeeDataPost(userName) {
            //console.log("employeedata:" + userName);

            var deferred = $q.defer();

            $http.get('/api/employee/GetEmployeeByUserName/?userName=' + userName)
                .success(function (response) {

                    _authentication.isAuth = true;
                    _authentication.userName = response.userName;
                    _authentication.fullName = response.employeeName;
                    _authentication.employeeId = response.id;
                    _authentication.departmentName = response.postedTo;
                    _authentication.empPicture = response.empPicture;
                    _authentication.email = response.email;
                    _authentication.phone = response.phone;

                    accountRepository.getUserById(response.id)
                        .$promise
                        .then(function (res) {
                            //console.log("employeedata fullname:" + _authentication.fullName);
                            _authentication.moduleId = res.moduleId;

                            accountRepository.getRoleById(res.roleId)
                                .$promise
                                .then(function (response1) {
                                    //console.log(_authentication);
                                    _authentication.roles = response1.roleName;
                                    _authentication.roleId = response1.roleId;

                                    //localStorageService.set('userData', { userName: userName, userId: response.id, role: _authentication.roles, roleId: _authentication.roleId });
                                });
                        });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    //_logOut();
                    console.log(err);
                    deferred.reject(err);
                });

            return deferred.promise;


        }

        function employeeData(userName) {
            //console.log("employeedata:" + userName);
            accountRepository.getUserDetailByUserName(userName)
                .$promise
                .then(function (response) {
                    //console.log(response);
                    _authentication.isAuth = true;
                    _authentication.userName = response.userName;
                    _authentication.fullName = response.employeeName;
                    _authentication.employeeId = response.id;
                    _authentication.departmentName = response.postedTo;
                    _authentication.empPicture = response.empPicture;
                    _authentication.email = response.email;
                    _authentication.phone = response.phone;

                    accountRepository.getUserById(response.id)
                        .$promise
                        .then(function (res) {
                            //console.log("employeedata fullname:" + _authentication.fullName);
                            _authentication.moduleId = res.moduleId;

                            accountRepository.getRoleById(res.roleId)
                                .$promise
                                .then(function (response1) {
                                    //console.log(_authentication);
                                    _authentication.roles = response1.roleName;
                                    _authentication.roleId = response1.roleId;

                                    localStorageService.set('userData', { userName: userName, userId: response.id, role: _authentication.roles, roleId: _authentication.roleId });
                                });
                        });


                }, function (err) {
                    _logOut();
                    _authentication.isAuth = false;
                });
        }

        var _isHRMSModule = function () {
            //alert("hrmsmodule ");
            return true;// $scope.authentication.moduleId == appModules.HRMS_Module;
        };

        //authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.lockLogin = _lockLogin;
        authServiceFactory.isHRMSModule = _isHRMSModule;

        return authServiceFactory;

    }
]);