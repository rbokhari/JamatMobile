
'use strict';

jamatApp.controller('RegionController',  ['$scope', 'RegionRepository', function ($scope, RegionRepository) {

    console.log("region controller");
    
    $scope.isBusy = true;

    $scope.loadRegion = function(){
        $scope.regions = RegionRepository.getAllRegionsByCountryId(1);
        $scope.regions
              .$promise
              .then(function(response){
              }, function(error){
              });
    };

}]);
