(function() {
  'use strict';

  let expect = chai.expect;

  describe('Login Controller', function() {

    let LoginController;

    beforeEach(module('discriminHATE'));

    beforeEach(inject(function($controller) {
      LoginController = $controller('LoginController');

      window.FB = {};

      window.FB.getLoginStatus = function getLoginStatus(fn) {
        window.FB.getLoginStatus.numTimesCalled++;
        fn({ status: 'connected', authResponse: { accessToken: 'sarah' } });
      };
      window.FB.getLoginStatus.numTimesCalled = 0;
    }));

    describe('getLoginStatus', function() {


      it('should be a function', function() {
        expect(window.getLoginStatus).to.be.a('function');
      });

      it('should do what it is supposed to do', function () {
        window.getLoginStatus();
        expect(window.FB.getLoginStatus.numTimesCalled).to.equal(1);
        expect(localStorage.getItem('token')).to.equal('sarah');
      });

    });

  });

}());
