(function() {
  'use strict';

  let expect = chai.expect;

  describe('ReportController', function() {

    let ReportController;
    let mockReportService = {};
    let $stateParams = {};

    beforeEach(module('discriminHATE'));

    beforeEach(module(function($provide) {
      $provide.value('ReportService', mockReportService);
    }));

    beforeEach(inject(function($controller) {
      mockReportService.addReport = function addReport() {
        return {
          type: 'religious',
          description: 'excessively burdoned at an airport',
          address: '1800 Address Street',
          city: 'Washington',
          state: 'D.C.',
          zip: '20008',
          createTime: '2017-03-10T00:09:16.445Z',
          id: '45tyhjwefhy57'
        };
      };

      $stateParams = {successMessage: null};

      ReportController = $controller('ReportController', {$stateParams: $stateParams});
    }));

    it('should have all of the things we expect it to', function() {
      expect(ReportController).to.be.an('object');
      expect(ReportController.notification).to.equal($stateParams.successMessage);
      expect(ReportController.content).to.be.an('object');
      expect(ReportController.addReport).to.be.a('function');
    });
  });

}());
