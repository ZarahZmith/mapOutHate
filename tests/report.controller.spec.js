(function() {
  'use strict';

  let expect = chai.expect;

  describe('ReportController', function() {

    let ReportController;
    let mockReportService = {};
    let mockState = {};
    let $stateParams = {};

    beforeEach(module('mapOutHate'));

    beforeEach(module(function($provide) {
      $provide.value('ReportService', mockReportService);
      $provide.value('$state', mockState);
    }));

    beforeEach(inject(function($controller) {
      mockReportService.addReport = function addReport() {
        return Promise.resolve({
          type: 'religious',
          description: 'excessively burdoned at an airport',
          address: '1800 Address Street',
          city: 'Washington',
          state: 'D.C.',
          zip: '20008',
        });
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

      mockState.current = {name: null};
      mockState.go = function go() {
        mockState.go.numTimesCalled++;
      };
      mockState.go.numTimesCalled = 0;

      $stateParams = {successMessage: null};

      ReportController = $controller('ReportController', {$stateParams: $stateParams});
    }));

    it('should have all of the things we expect it to', function() {
      expect(ReportController).to.be.an('object');
      expect(ReportController.notification).to.equal($stateParams.successMessage);
      expect(ReportController.content).to.be.an('object');
      expect(ReportController.getReports).to.be.a('function');
    });

    describe('addReport', function() {

      it('should act the way it is intended to', function(done) {
        expect(ReportController.addReport).to.be.a('function');
        ReportController.addReport()
          .then(function() {
            expect(mockState.go.numTimesCalled).to.equal(1);
            done();
          })
          .catch(function(err) {
            expect(ReportController.notification).to.equal('Your report did NOT go through. Please try again.');
            done(err);
          });
      });

    });
    //TODO execute functions and ensure they do what they are supposed to

  });

}());
