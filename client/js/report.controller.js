(function() {
  'use strict';

  angular.module('discriminHATE')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['$state', '$stateParams', 'ReportService'];

  function ReportController($state, $stateParams, ReportService) {
    let vm = this;

    vm.notification = $stateParams.successMessage;
    vm.content = {};

    vm.addReport = function addReport(content) {
      ReportService.addReport(content)
        .then(function addReportToPage() {
          $state.go('view-reports', {successMessage: 'Your report has sucessfully gone through. Thank you for sharing your story.'});
        })
        .catch(function handleErrors(err) {
          console.warn(err, err.status);
          vm.notification = 'Your report did NOT go through. Please try again.';
        });
    };
  }
}());
