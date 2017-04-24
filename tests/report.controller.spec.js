(function() {
  'use strict';

  let expect = chai.expect;

  describe('ReportController', function() {

    let ReportController;
    let mockReportService = {};

    beforeEach(module('discriminHATE'));

    beforeEach(module(function($provide) {
      $provide.value('ReportService', mockReportService);
    }));

    beforeEach(inject(function($controller) {
      mockReportService.addReport = function addStudent() {
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

      ReportController = $controller('ReportController');
    }));

    it('should have all of the things we expect it to', function() {
      expect(ReportController).to.be.an('object');
      expect(ReportController.notification).to.equal(null);
      expect(ReportController.content).to.be.an('object');
      expect(ReportController.addReport).to.be.a('function');
    });
  });

}());
