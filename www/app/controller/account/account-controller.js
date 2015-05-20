
jamatApp.controller('AccountController',['$scope','$state', 'authRepository', 'localStorageService', 
	function($scope, $state, authRepository, localStorageService){

        $scope.loginData = {
            userName: "",
            password: ""
        };


		$scope.verifyAutoLogin = function(){
		
				var authData = localStorageService.get('authorizationData');
				
				if (authData){
					$state.go('app.dashboard');
				}
		};
		
		$scope.login = function(){
			$scope.isLoginProcess = false;

			authRepository.login($scope.loginData)
				.then(function(response){
					if (response.userId) {
						$state.go('app.dashboard');
	                    //$window.location.href = '/jamat';
	                } else {
	                    $scope.message = "Invalid Username or Password !";
	                    console.log($scope.message);
	                }
				}, function(error){
	                if (error.status == undefined) {
	                    $scope.message = "Invalid Username or Password !";
	                }
	                else if (error.status == 500) {
	                    $scope.message = "User not found !";
	                }
				});
		};

	    $scope.logOut = function () {
	        authRepository.logOut();
	        $state.go('login');
	        //$window.location.href = '/Login';
	    };

}]);