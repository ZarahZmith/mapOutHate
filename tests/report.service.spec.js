(function() {
  'use strict';

  let expect = chai.expect;

  describe('Report Service', function() {

    let ReportService;
    let $httpBackend;

    beforeEach(module('mapOutHate'));

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

      it('should add a report if appropriate information is given', function(done) {
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
            done();
          });

        $httpBackend.flush();
      });

    });

    describe('takeFurtherAction', function() {

      it('should be a function', function() {
        expect(ReportService.takeFurtherAction).to.be.an('function');
      });

      it('should do what it is expected to', function() {
        let result = ReportService.takeFurtherAction('racial');
        expect(result).to.equal('To take further action contact the Anti-Defamation League or the American Civil Liberties Union on the "More Information" page.');
        result = ReportService.takeFurtherAction('religion');
        expect(result).to.equal('To take further action contact the Anit-Defamation League on the "More Information" page.');
        result = ReportService.takeFurtherAction('sexual-orientation' || 'transgender');
        expect(result).to.equal('To take further action report to the American Civil Liberties Union on the "More Information" page.');
        result = ReportService.takeFurtherAction('gender');
        expect(result).to.equal('To take the next step know your rights as presented via the U.S. Equal Employment Opprotunity Commission on the "More Information" page.');
        result = ReportService.takeFurtherAction('disability');
        expect(result).to.equal('To take further action file a complaint with the Department of Justice through the "More Information" page.');
        result = ReportService.takeFurtherAction('pregnancy');
        expect(result).to.equal('To take further action review your rights on the U.S. Equal Employment Opprotunity Commission website linked on the "More Information" page.');
        result = ReportService.takeFurtherAction('other');
        expect(result).to.equal('To take further action please refer to the "More Information" page.');
      });

    });

  });
}());
