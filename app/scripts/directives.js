'use strict';

/**
 * @ngdoc function
 * @description
 * # Directives
 * app directives
 */

angular.module('devApp')
  .directive('filterBar', function(){
    return {
        restrict: 'E',
        templateUrl: '../views/filter.html',
        controller: 'filterCtrl',
        scope: {
           data: '=data',
           filters: '=filters'
        }
    };
  })
  .directive('detailsView', function(){
    return{
        retrist: 'E',
        templateUrl: '../views/details.html',
        controller: 'detailsCtrl',
        scope: {
            details: '=details'
        }
    };
  });

