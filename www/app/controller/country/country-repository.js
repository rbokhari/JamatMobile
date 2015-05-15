
'use strict';

jamatApp.factory('countryRepository', ['$resource', '$http', 'SERVICE', function ($resource, $http, SERVICE) {

    var _getAllCountries = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/country').query(); // can use get() instead of query(), but using query() because it except to return back array of objects
    };

    var _getCountryById = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/' + id).get();
    };

    var _addCountry = function (country) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/country').save(country);
    };

    var _editCountry = function (country) {
        return $http.put(SERVICE.BASE_ADDRESS + 'api/country/' + country.countryId, country);
    };


    var _getAllRegionByCountryId = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/region/' + id).query(); // can use get() instead of query(), but using query() because it except to return back array of objects
    };

    var _getRegionById = function (id, rId) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/country/' + id + "/Region/"+ rId).get();
    };

    var _addRegion = function (region) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/country').save(region);
    };

    var _editRegion = function (region) {
        return $http.put(SERVICE.BASE_ADDRESS + 'api/country/' + region.regionId, region);
    };

    return {
        getAllCountries: _getAllCountries,
        getCountryById: _getCountryById,
        addCountry: _addCountry,
        editCountry: _editCountry,
        getAllRegionsByCountryId: _getAllRegionByCountryId,
        getRegionById: _getRegionById,
        addRegion: _addRegion,
        editRegion: _editRegion

    };

}]);
