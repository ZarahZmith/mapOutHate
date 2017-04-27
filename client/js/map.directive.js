(function() {
  'use strict';

  angular.module('discriminHATE')
    .directive('map', map);

  function map(dateFilter) {

    return {
      templateUrl: 'templates/map.template.html',
      restrict: 'E',
      link: setupMap,
      scope: {
        reports: '='
      }
    };

    function setupMap(scope) {
      let reportMap = new google.maps.Map(document.querySelector('#map'),
        { center: {lat: 38.9072, lng: -77.0369}, zoom: 8 });

      scope.$watch('reports', function addReportsToMap() {
        scope.reports.map(function addMarker(reportObj) {
          console.log(reportObj, 'creating a marker for a report');

          let reportLocation = new google.maps.LatLng(reportObj.latitude, reportObj.longitude);

          let reportMarker =new google.maps.Marker({
            type: reportObj.type,
            map: reportMap,
            position: reportLocation
          });

          reportMarker.data = reportObj;

          let date = dateFilter(reportMarker.data.createTime, 'MMM. dd, yyyy');

          let reportDetails = new google.maps.InfoWindow({
            content: reportMarker.data.type + ', ' + reportMarker.data.description + ', ' + date
          });

          reportMarker.addListener('click', function markerClick() {
            reportDetails.open(map, reportMarker);
          });
        });
      });
    }


  }
}());
