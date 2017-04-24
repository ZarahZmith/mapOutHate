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
          type: content.type,
          description: content.description,
          address: content.address,
          city: content.city,
          state: content.state,
          zip: content.zip
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      addReport: addReport
    };
  }


}());
