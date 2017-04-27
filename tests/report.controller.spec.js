(function() {
  'use strict';

  let expect = chai.expect;

  describe('ReportController', function() {

    let ReportController;
    let mockReportService = {};
    let $stateParams = {};

    beforeEach(module('mapOutHate'));

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
        };
      };

      mockReportService.viewAllReports = function viewAllReports() {
        return [
          {
            type: 'religious',
            description: 'excessively burdoned at an airport',
            address: '1800 Address Street',
            city: 'Washington',
            state: 'D.C.',
            zip: '20008',
            createTime: new Date(),
            id: '45tyhjwefhy57',
            latitude: '38.9072',
            longitude: '-77.0369'
          }
        ];
      };

      //TODO mock$state

      $stateParams = {successMessage: null};
      
      ReportController = $controller('ReportController', {$stateParams: $stateParams});
    }));

    it('should have all of the things we expect it to', function() {
      expect(ReportController).to.be.an('object');
      expect(ReportController.notification).to.equal($stateParams.successMessage);
      expect(ReportController.content).to.be.an('object');
      expect(ReportController.addReport).to.be.a('function');
      expect(ReportController.getReports).to.be.a('function');
    });

    //TODO execute functions and ensure they do what they are supposed to

  });

}());
