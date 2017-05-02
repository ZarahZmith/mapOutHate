(function() {
  'use strict';

  angular.module('mapOutHate')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['$state', '$stateParams', 'ReportService'];

  function ReportController($state, $stateParams, ReportService) {
    let vm = this;

    vm.notification = $stateParams.successMessage;
    vm.content = {};
    vm.reports = [];
    vm.error = null;

    /**
     * Add a new report
     * @param  {Object} content The data the report is made up of
     * @return {Promise}
     */
    vm.addReport = function addReport(content) {
      return ReportService.addReport(content)
        .then(function addReportToPage() {
          let message = 'Your report has sucessfully gone through. Thank you for sharing your story. ';
          let label = ReportService.takeFurtherAction(content.type);
          $state.go('view-reports', {successMessage: message += label});
        })
        .catch(function handleErrors(err) {
          console.warn(err);
          vm.notification = 'Your report did NOT go through. Please try again.';
          let addReportErr = new Error(err.message);
          throw addReportErr;
        });
    };

    /**
     * Retreive all reports
     * @return {Promise}
     */
    vm.getReports = function getReports() {
      return ReportService.viewAllReports()
        .then(function retreiveReports(content) {
          vm.reports = vm.reports.concat(content);
          console.log(vm.reports);
        })
        .catch(function handleErrors(err) {
          console.warn(err, err.status);
          vm.error = 'There was an issue loading the pins.';
        });
    };

    if ($state.current.name === 'view-reports') {
      vm.getReports();
    }
  }
}());
