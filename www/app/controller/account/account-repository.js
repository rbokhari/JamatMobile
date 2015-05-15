
'use strict';

jamatApp.factory('accountRepository', ['$resource', 'SERVICE', function ($resource, SERVICE) {

    var _getUserById = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/account/GetUserDetail/?id=' + id).get();
    };

    var _getUserByUserName = function (username,pass) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/account/GetUserByUserName/' + username + '/' + pass).get();
    };

    var _getRoleById = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/account/GetRoleDetail/?id=' + id).get();
    };

    var _getModuleById = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/account/GetModuleDetail/?id' + id).get();
    };

    var _getUserDetailByUserName = function (userName) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/employee/GetEmployeeByUserName/?userName=' + userName).get();
    };


    return {
        getUserById: _getUserById,
        getUserByUserName: _getUserByUserName,
        getRoleById: _getRoleById,
        getModuleById: _getModuleById,
        getUserDetailByUserName: _getUserDetailByUserName
    };

}]);

