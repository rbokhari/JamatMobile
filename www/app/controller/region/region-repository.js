'use strict';

jamatApp.factory('RegionRepository', ['$resource', 'VALIDATIONS', 'SERVICE', function ($resource, VALIDATIONS, SERVICE) {

    var _getAllRegionsByCountryId = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/region/').query();
    };


    return {

         getAllRegionsByCountryId:  _getAllRegionsByCountryId,

        //    get: function() {
        //        return $resource('/api/validation').query(); // can use get() instead of query(), but using query() because it except to return back array of objects
        //    }
    };

}]);
