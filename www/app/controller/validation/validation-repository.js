'use strict';

jamatApp.factory('validationRepository', ['$resource', 'VALIDATIONS', 'SERVICE', function ($resource, VALIDATIONS, SERVICE) {

    var _getAllDetailsByValidationId = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + id + '/GetValidationDetailByValidationId').query();
    };

    var _getSingleDetailByValidationId = function (vid) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + vid).get();
    };

    var _getAllAuxilary = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + VALIDATIONS.AUXILARY + '/GetValidationDetailByValidationId').query();
    };


    var _getAllNationality = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + VALIDATIONS.NATIONALITY + '/GetValidationDetailByValidationId').query();
    };


    var _getAllChandaType = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + VALIDATIONS.CHANDA_TYPE + '/GetValidationDetailByValidationId').query();
    };


    var _getAllCountry = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + VALIDATIONS.COUNTRY + '/GetValidationDetailByValidationId').query();
    };


    var _getAllTajneedType = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/validation/' + VALIDATIONS.TAJNEED_TYPE + '/GetValidationDetailByValidationId').query();
    };


    return {

        getAllDetailsByValidationId: _getAllDetailsByValidationId,
        getSingleDetailByValidationId: _getSingleDetailByValidationId,
        getAllAuxilary: _getAllAuxilary,
        getAllNationality: _getAllNationality,
        getAllChandaType: _getAllChandaType,
        getAllCountry: _getAllCountry,
        getAllTajneedType: _getAllTajneedType

        //    get: function() {
        //        return $resource('/api/validation').query(); // can use get() instead of query(), but using query() because it except to return back array of objects
        //    }
    };

}]);
