'use strict';

/**
 * @ngdoc function
 * @name devApp.controller:MainCtrl
 * @description
 * # FilterCtrl
 * Controller of the devApp
 */

angular.module('devApp')
  .controller('filterCtrl', function ($scope) {
    $scope.getProtocolCount = function(i) {
        var iCount = iCount || 0;
        for (var j = 0; j < $scope.data.length; j++) {
          if ($scope.data[j].Protocol === i) {
            iCount++;
          }
        }
        return iCount;
      };
      $scope.getClientCount = function(i) {
	      var iCount = iCount || 0;
	      for (var j = 0; j < $scope.data.length; j++) {
	        if ($scope.data[j].ClientIP === i) {
	          iCount++;
	        }
	      }
	      return iCount;
	    };

      $scope.getSeverityCount = function(severity){
        var count = 0;
        for(var i in $scope.data){
            if($scope.data[i].Severity === severity){
                count++;
            }
        }
        return count;
      };
      $scope.addFilter = function(filterType, val){
        var ignore = false;
        if($scope.filters.added.length > 0){
	        for(var i in $scope.filters.added){
	            //first check if filter and value already exist
	            if($scope.filters.added[i][filterType] === val){
	                $scope.filters.added.splice(i,1);
	                ignore = true;
	            }
	        }
        }
        if(!ignore){
	        $scope.filters.added.push({});
	        $scope.filters.added[$scope.filters.added.length-1][filterType] = val;
        }
      };
  })
  .filter('unique', function() {

    return function (arr, field) {
      if(arr){
	      var o = {}, i, l = arr.length, r = [];
	      for(i=0; i<l;i+=1) {
	        o[arr[i][field]] = arr[i];
	      }
	      for(i in o) {
	        r.push(o[i]);
	      }
	      return r;
      }
    };
  });

