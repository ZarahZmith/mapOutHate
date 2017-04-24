(function() {
  'use strict';

  let expect = chai.expect;

  describe('Report Service', function() {

    let ReportService;
    let $httpBackend;

    beforeEach(module('discriminHATE'));

    beforeEach(inject(function(_$httpBackend_, _ReportService_) {
      $httpBackend = _$httpBackend_;
      ReportService = _ReportService_;

      $httpBackend
        .whenPOST('/report')
        .respond({
          type: 'religious',
          description: 'excessively burdoned at an airport',
          address: '1800 Address Street',
          city: 'Washington',
          state: 'D.C.',
          zip: '20008',
          createTime: '2017-03-10T00:09:16.445Z',
          id: '45tyhjwefhy57'
        });
    }));

    describe('addReport', function() {

      it('should add a report if appropriate information is given', function() {
        let returnValue = ReportService.addReport({
          type: 'religious',
          description: 'testing testing 123',
          address: '1800 address Street',
          city: 'Washington',
          state: 'D.C.',
          zip: '30000',
        });

        returnValue
          .then(function(data) {
            expect(data).to.be.an('object');
            expect(data.type).to.be.a('string');
            expect(data.description).to.be.a('string');
            expect(data.address).to.be.a('string');
            expect(data.city).to.be.a('string');
            expect(data.state).to.be.a('string');
            expect(data.zip).to.be.a('string');
          });

        $httpBackend.flush();
      });

    });

  });
}());
