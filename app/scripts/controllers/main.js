'use strict';

/**
 * @ngdoc function
 * @name devApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the devApp
 */

angular.module('devApp')
  .controller('MainCtrl', function ($scope, alertsService) {
    $scope.searchPanelVisible = true;
    $scope.searchText = '';
    $scope.alerts = [];
    $scope.filters = {added:[]};
    $scope.itemSelected = false;
    alertsService.getData().then(function(response){
        $scope.alerts = response;
    });
    //to open in details view
    $scope.loadDetails = function(data){
        $scope.itemSelected = data;
    };
  })
  .filter('searchFilter', ['_', function(_){
    //Search each objects keys to find match.
    return _.memoize(function(alerts, searchText) {
            if(searchText !== undefined && searchText !== ''){
	            var filtered = [];
	            angular.forEach(alerts, function(item) {
	                for(var i in Object.keys(item)){
	                    if(typeof item[Object.keys(item)[i]] === 'string'){
	                        if(item[Object.keys(item)[i]].toLowerCase().indexOf(searchText.toLowerCase()) > -1){
	                            filtered.push(item);
	                            continue;
	                        }
	                    }
	                    else if(typeof item[Object.keys(item)[i]] === 'number'){
	                        if( item[Object.keys(item)[i]] === parseInt(searchText)){
	                            filtered.push(item);
	                            continue;
	                        }
	                    }
	                }
	            });
	            return filtered;
            }
            else{
                return alerts;
            }
        }, function(items, keyObj) {
            return JSON.stringify(items)+JSON.stringify(keyObj);
        });
  }])
  .filter('customFilter', ['_', function(_){
    return _.memoize(function(alerts, addedFilter){
        if(addedFilter.length > 0){
	        var filtered = [];
	        angular.forEach(alerts, function(item) {
	            //here we search for each filter in each item.
	            for(var i in Object.keys(item)){
	                for(var t in addedFilter){
                        if(Object.keys(addedFilter[t])[0].toLowerCase() === Object.keys(item)[i].toLowerCase()){
                            if(addedFilter[t][Object.keys(addedFilter[t])].toLowerCase() === item[Object.keys(item)[i]].toLowerCase()){
                                if(addedFilter[t][Object.keys(addedFilter[t])].toLowerCase() === item[Object.keys(item)[i]].toLowerCase() && filtered.indexOf(item) === -1){
                                    filtered.push(item);
                                }
                                else{
                                    filtered.splice(filtered.indexOf(item), 1);
                                }
                            }
                        }
	                }
	            }
	        });
	        return filtered;
        }
        else{
            return alerts;
        }
    }, function(items, keyObj) {
        return JSON.stringify(items)+JSON.stringify(keyObj);
    });
  }]);

