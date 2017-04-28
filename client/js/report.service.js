(function() {
  'use strict';

  angular.module('mapOutHate')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['$http'];

  function ReportService($http) {

    /**
     * Add a report to the database
     * @param {Object} content The data required in a report
     * @return {Promise}
     */
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

    function viewAllReports() {
      return $http({
        url: '/report/all',
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      addReport: addReport,
      viewAllReports: viewAllReports
    };
  }


}());
