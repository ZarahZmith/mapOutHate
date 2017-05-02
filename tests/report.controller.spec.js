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
      mockReportService.addReport = function addReport(content) {

        if (typeof(content) === 'object') {
          return Promise.resolve({
            type: 'religious',
            description: 'excessively burdoned at an airport',
            address: '1800 Address Street',
            city: 'Washington',
            state: 'D.C.',
            zip: '20008',
          });
        } else {
          return Promise.reject('The promise was rejected.');
        }
      };

      mockReportService.viewAllReports = function viewAllReports() {
        return Promise.resolve([
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
        ]);
      };

      mockReportService.takeFurtherAction = function takeFurtherAction() {
        return 'Success.';
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
        ReportController.addReport({})
          .then(function() {
            expect(mockState.go.numTimesCalled).to.equal(1);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('should act the way it is intended when it enters the catch', function(done) {
        ReportController.addReport()
          .then(function() {
            done('should not resolve with bad data');
          })
          .catch(function() {
            expect(ReportController.notification).to.equal('Your report did NOT go through. Please try again.');
            done();
          });
      });

    });

    describe('getReports', function() {

      it('should be a function', function() {
        expect(ReportController.getReports).to.be.a('function');
      });

      it('should do what it is expected to', function(done) {
        ReportController.getReports()
          .then(function() {
            expect(ReportController.reports).to.be.a('array');
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

    });

  });

}());
