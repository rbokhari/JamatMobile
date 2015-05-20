
'use strict';

jamatApp.controller('ValidationController',
    ['$scope', 'validationRepository', '$stateParams',
        function ($scope, validationRepository, $stateParams) {

            console.log("validation controller");
            
            $scope.isBusy = true;

//            $scope.validationDetails = validationRepository.get();
//            $scope.validationDetails.$promise.then(function () {
//                //alert("success");
//            }, function () {
//                //alert("error");
//            })
//            .then(function () { $scope.isBusy = false; });
            
            $scope.loadAuxilary = function(){
                $scope.auxilaries = validationRepository.getAllAuxilary();
                $scope.auxilaries
                      .$promise
                      .then(function(response){
                      }, function(error){
                      });
            };


            $scope.loadNationality = function(){
                $scope.nationalities = validationRepository.getAllNationality();
                $scope.nationalities
                      .$promise
                      .then(function(response){

                      }, function(error){
                      });
            };
            
            //alert($routeParams.id);
            if ($stateParams.id != undefined) {
                $scope.validationDetail = validationRepository.getSingleDetailByValidationId($stateParams.id);
            }

            $scope.save = function (validationDetail) {
                $scope.errors = [];

                validationRepository.save(validationDetail).$promise.then(
                    function () {
                        // success case
                        $.gritter.add({
                            title: 'Validation',
                            text: 'Added Successfully !',
                            time: 2000,
                            position: 'center'
                        });

                        console.log("save - Successfully !");
                        $location.url('/jamatapp/validation');
                    }, function (response) {
                        // failure case
                        console.log("save - Error !");
                        $scope.errors = response.data;
                    }
                );
            };

            $scope.saveAddNew = function (validationDetail) {
                $scope.errors = [];

                var clearDept = {
                    departmentCode: "",
                    departmentName: "",
                    statusId: ""
                };

                validationRepository.save(validationDetail).$promise.then(
                    function () {
                        // success case
                        $scope.departmentForm.$setPristine();
                        $scope.department = clearDept;
                        console.log("saveAddNew - Successfully !");

                    }, function (response) {
                        // failure case
                        $scope.errors = response.data;
                        console.log("saveAddNew - Error !");
                    }
                );
            };

            $scope.edit = function (department) {
                $scope.errors = [];

                departmentEditRepository.put($routeParams.id, department).then(
                    function () {
                        // success case
                        console.log("edit - Successfully !");
                        $location.url('/HRMSPortal/department');
                    }, function (response) {
                        // failure case
                        console.log("edit - Error !");
                        $scope.errors = response.data;
                    }
                );
            };

        }]);
