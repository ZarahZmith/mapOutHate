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
      if (typeof(content) === racial) {
        return 'To take further action contact the Anit-Defamation League (https://www.adl.org/take-action/report-an-incident) or the American Civil Liberties Union (https://www.aclu.org/about/affiliates).';
      } else if (typeof(content) === religion) {
        return 'To take further action contact the Anit-Defamation League (https://www.adl.org/take-action/report-an-incident).';
      } else if (typeof(content) === sexual-orientation || typeof(content) === transgender) {
        return 'To take further action report to the American Civil Liberties Union (https://action.aclu.org/secure/report-lgbthiv-discrimination).';
      } else if (typeof(content) === gender) {
        return 'To take the next step know your rights as presented via the U.S. Equal Employment Opprotunity Commission (https://www.eeoc.gov/laws/types/sex.cfm).'
      } else if (typeof(content) === disability) {
        return 'To take further action file a complaint with the Department of Justice (https://www.justice.gov/crt/how-file-complaint).';
      } else if (typeof(content) === preganancy) {
        return 'To take further action know your rights as presented via the U.S. Equal Employment Opprotunity Commission (https://www.eeoc.gov/laws/guidance/pregnancy_guidance.cfm).';
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
