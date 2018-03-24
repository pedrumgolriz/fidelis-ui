'use strict';

/**
 * @ngdoc function
 * @description
 * # Alerts Service
 */

angular.module('devApp')
  .factory('alertsService', function ($http) {
    var data = function(){
        return $http.get('alerts.json').then(function(response){
            return response.data;
        });
    };
    return{
        getData: data
    };
  });

