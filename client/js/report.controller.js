(function() {
  'use strict';

  angular.module('discriminHATE')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['ReportService'];

  function ReportController(ReportService) {
    let vm = this;

    vm.notification = null;
    vm.content = {};

    console.log('Report controller');

    vm.addReport = function addReport(content) {
      console.log('add a report function', content);
      ReportService.addReport(content)
        .then(function addReportToPage() {
          vm.notification = 'Your report has sucessfully gone through. Thank you for sharing your story.';
        })
        .catch(function handleErrors(err) {
          console.warn(err, err.status);
          vm.notification = 'Your report did NOT go through. Please try again.';
        });
    };
  }
}());
