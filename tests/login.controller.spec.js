(function() {
  'use strict';

  let expect = chai.expect;

  describe('Login Controller', function() {

    let LoginController;

    beforeEach(module('discriminHATE'));

    beforeEach(inject(function($controller) {
      LoginController = $controller('LoginController');
    }));

    describe('getLoginStatus', function() {

      it('should be a function', function() {
        console.info('window.getLoginStatus', window.getLoginStatus);
        expect(window.getLoginStatus).to.be.a('function');
      });

    });

  });

}());
