(function() {
  'use strict';

  angular.module('discriminHATE')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['$http'];

  function ReportService($http) {

    function addReport(content) {
      return $http({
        url: '/report',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          content: content
        }
      })
      .then(function handleResponse(response) {
        return response.json;
      });
    }
    return {
      addReport: addReport
    };
  }


}());
