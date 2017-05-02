(function() {
  'use strict';

  angular.module('mapOutHate')
    .controller('NavController', NavController);

  function NavController() {
    let vm = this;

    /**
     * If the user is logged in
     * @return {Boolean} Yes or no if the user has a token
     */
    vm.isLoggedIn = function isLoggedIn() {
      return !!localStorage.getItem('token');
    };
  }
}());
