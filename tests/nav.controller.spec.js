(function() {
  'use strict';

  let expect = chai.expect;

  describe('NavController', function() {

    let NavController;
    let token;

    beforeEach(module('mapOutHate'));

    beforeEach(inject(function($controller) {
      NavController = $controller('NavController');
    }));

    describe('isLoggedIn', function() {

      it('should be a function', function() {
        expect(NavController.isLoggedIn).to.be.an('function');
      });

      it('should return a boolean', function() {
        localStorage.setItem('token', 'sarah');
        expect(NavController.isLoggedIn()).to.equal(true);
        localStorage.removeItem('token');
        expect(NavController.isLoggedIn()).to.equal(false);
      });

    });

  });
}());
