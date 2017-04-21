(function() {
  'use strict';

  angular.module('discriminHATE')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['$state', 'ReportService'];

  function ReportController($state, ReportService) {
    let vm = this;

    vm.notification = null;

    console.log('Report controller');

    vm.addReport = function addReport(content) {
      console.log('add a report function', content);
      ReportService.addReport(content)
        .then(function addReportToPage(data) {
          $state.go({id: data.id});
          vm.notification = 'Your report has sucessfully gone through. Thank you for sharing your story.';
        })
        .catch(function handleErrors(err) {
          console.warn(err);
          //TODO create a more informative catch
        });
    };
  }
}());
