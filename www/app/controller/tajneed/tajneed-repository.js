

jamatApp.factory('tajneedRepository', ['$resource', '$http', 'SERVICE', function ($resource, $http, SERVICE) {

    var _getAllTajneed = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed').query(); // can use get() instead of query(), but using query() because it except to return back array of objects
    };

    var _getTajneedCount = function () {
        return $http.get(SERVICE.BASE_ADDRESS + 'api/tajneed/GetTajneedCount'); 
    };

    var _getTajneedById = function (id) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/' + id).query();
    };

    var _addTajneed = function (tajneed) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/').save(tajneed);
    };

    var _editTajneed = function (tajneed) {
        return $http.put(SERVICE.BASE_ADDRESS + 'api/tajneed/' + tajneed.id, tajneed);
    };

    var _addTajneedIncome = function (tajneedIncome) {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/' + tajneedIncome.tajneedId + '/PostTajneedIncome').save(tajneedIncome);
    };


    var _getCountByAuxilary = function() {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/getTajneedAuxilary').query();
    };

    var _getCountByRegion = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/getTajneedRegion').query();
    };

    var _getCountByNationality = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/getTajneedNationality').query();
    };

    var _getCountByWassiyat = function () {
        return $resource(SERVICE.BASE_ADDRESS + 'api/tajneed/getTajneedWassiyat').query();
    };

    return {
        getAllTajneed: _getAllTajneed,
        getTajneedById: _getTajneedById,
        addTajneed: _addTajneed,
        editTajneed: _editTajneed,
        addTajneedIncome: _addTajneedIncome,
        getTajneedCount: _getTajneedCount,
        getCountByAuxilary: _getCountByAuxilary,
        getCountByRegion: _getCountByRegion,
        getCountByNationality: _getCountByNationality,
        getCountByWassiyat: _getCountByWassiyat
    };

}]);
