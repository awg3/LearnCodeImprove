var myApp = angular.module("PowerChess", []);

myApp.controller("mainController", ["$scope", "$log", "$timeout", "$filter", "$rootElement", "$http", function($scope, $log, $timeout, $filter, $rootElement, $http){
    $scope.myName = "Alan";
    $scope.appName = $rootElement.attr("ng-app");
    $scope.minHandleLength = 5;
    $scope.displayHandleError = false;
    
    $http.get("176.32.230.42")
        .success(function(result){
           $scope.name = result; 
        })
        .error(function(data, status){
            console.log("Data: " + data);
        });
//    $scope.rules = [
//        {
//            Name: "Must be more than 5 characters"
//        },
//        { 
//            Name: "Must not be used elsewhere"
//        },
//        {
//            Name: "Must be cool"
//        }
//    ];
    
    $scope.determineHandleError = function(length){
        if(length > 0 && length < 5){
            $scope.displayHandleError = true;
        }
        else {
            $scope.displayHandleError = false;
        }
    }
    
    $scope.alertClick = function(){
        alert("Outstanding!");
    }
    
    
}]);

