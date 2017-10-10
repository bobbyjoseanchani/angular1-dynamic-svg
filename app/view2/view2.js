'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','GetQuantumRandonNumber', '$interval', function($scope, GetQuantumRandonNumber, $interval) {
	$scope.width = 100;
	$scope.height = 100;
	$scope.randomValues = [];
	var this_ = this;
	var randNumberParams = {
		'length' : 1,
		'type' : 'uint8'
	};
	
	// Call API every 3 seconds
	$interval(function() {
		// Get the quantum random number from API
		GetQuantumRandonNumber.get(randNumberParams).$promise.then(function(data){
			$scope.heightFromAPI = data.data[0];
			$scope.randomValues.push(data.data[0]);
			// recalculate mean after adding the new value to array
			var total = 0;
			$scope.noOfRectangleChoice = [];
			for(var i =0; i < $scope.randomValues.length;i++){
				total = total + $scope.randomValues[i];		
				$scope.noOfRectangleChoice.push(i + 1);
			}
			$scope.meanRandomValue = total/$scope.randomValues.length;
			if($scope.meanRandomValue > data.data[0]){ // if value less than mean, paint rectangle in red
				$scope.fillColor = "red";
			} else if($scope.meanRandomValue < data.data[0]){ // if value greater than mean, paint rectangle in green
				$scope.fillColor = "green";
			} else { //  if value equal to mean, paint rectangle in orange
				$scope.fillColor = "orange";
			}	
		}).
		catch(function(data){
			console.log(data);
		});
	
	}, 5000);
	
	
}]);