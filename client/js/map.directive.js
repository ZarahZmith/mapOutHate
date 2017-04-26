(function() {
  'use strict';

  angular.module('discriminHATE')
    .directive('map', map);

  function map() {

    return {
      templateUrl: 'templates/map.template.html',
      restrict: 'E',
      link: setupMap
    };

    function setupMap() {
      new google.maps.Map(document.querySelector('#map'),
        { center: {lat: 38.9072, lng: -77.0369}, zoom: 8 });
    }
  }
}());
