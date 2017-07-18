var module = angular.module("FormApp", []);
 module.controller("MainCtrl", MainCtrlCtor);


function MainCtrlCtor($scope, $http)
{
     	$scope.formModel = {};

	$scope.onSubmit = function (valid) {
		if (valid)
		{
		console.log("Hey i'm submitted!");
		console.log($scope.formModel);

		$http.post('http://localhost:8080/www/MyServlet', $scope.formModel).
			then(function (data) {
				console.log(":)")
			},
            function(data) {
				console.log(":(")
			});
		}
		else
		{
			console.log("I'm not valid!");
		}
	};           
}

