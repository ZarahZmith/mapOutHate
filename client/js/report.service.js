(function() {
  'use strict';

  angular.module('mapOutHate')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['$http'];

  function ReportService($http) {

    /**
     * Function to connect to resources that provide steps for further action
     * @param  {Object} type The type of discrimination
     * @return {String}      Future step options
     */
    function takeFurtherAction(type) {
      if (type === 'racial') {
        return 'To take further action contact the Anti-Defamation League or the American Civil Liberties Union on the "More Information" page.';
      } else if (type === 'religion') {
        return 'To take further action contact the Anit-Defamation League on the "More Information" page.';
      } else if (type === 'sexual-orientation' || type === 'transgender') {
        return 'To take further action report to the American Civil Liberties Union on the "More Information" page.';
      } else if (type === 'gender') {
        return 'To take the next step know your rights as presented via the U.S. Equal Employment Opprotunity Commission on the "More Information" page.';
      } else if (type === 'disability') {
        return 'To take further action file a complaint with the Department of Justice through the "More Information" page.';
      } else if (type === 'pregnancy') {
        return 'To take further action review your rights on the U.S. Equal Employment Opprotunity Commission website linked on the "More Information" page.';
      } else {
        return 'To take further action please refer to the "More Information" page.';
      }
    }

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
      viewAllReports: viewAllReports,
      takeFurtherAction: takeFurtherAction
    };
  }


}());
